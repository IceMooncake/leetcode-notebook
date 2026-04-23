#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'
import { spawn } from 'node:child_process'

const cwd = process.cwd()
const srcRoot = path.join(cwd, 'src')

function parseQuestionNumber(argv) {
  for (const arg of argv) {
    if (/^\d+$/.test(arg)) return Number(arg)
  }
  return NaN
}

function getRangeStart(n, size) {
  return Math.floor((n - 1) / size) * size + 1
}

function findQuestionDirByPattern(baseDir, questionNumber) {
  if (!fs.existsSync(baseDir)) return null
  const entries = fs.readdirSync(baseDir, { withFileTypes: true })
  const re = new RegExp(`^${questionNumber}(\\.|\\s|$)`)
  const candidates = entries
    .filter((e) => e.isDirectory() && re.test(e.name))
    .map((e) => path.join(baseDir, e.name))

  if (candidates.length === 0) return null
  candidates.sort((a, b) => a.localeCompare(b))
  return candidates[0]
}

function findQuestionTestFileFallback(rootDir, questionNumber) {
  const re = new RegExp(`^${questionNumber}(\\.|\\s|$)`)
  const stack = [rootDir]
  const found = []

  while (stack.length > 0) {
    const current = stack.pop()
    if (!current) continue

    const entries = fs.readdirSync(current, { withFileTypes: true })
    for (const entry of entries) {
      const fullPath = path.join(current, entry.name)
      if (!entry.isDirectory()) continue

      if (re.test(entry.name)) {
        const testFile = path.join(fullPath, 'index.test.ts')
        if (fs.existsSync(testFile)) {
          found.push(testFile)
        }
      }

      stack.push(fullPath)
    }
  }

  if (found.length === 0) return null
  found.sort((a, b) => a.localeCompare(b))
  return found[0]
}

function resolveTestFile(questionNumber) {
  const hundredStart = getRangeStart(questionNumber, 100)
  const tenStart = getRangeStart(questionNumber, 10)

  const hundredDir = `${hundredStart}-${hundredStart + 99}`
  const tenDir = `${tenStart}-${tenStart + 9}`

  const expectedBase = path.join(srcRoot, hundredDir, tenDir)
  const questionDir = findQuestionDirByPattern(expectedBase, questionNumber)

  if (questionDir) {
    const testFile = path.join(questionDir, 'index.test.ts')
    if (fs.existsSync(testFile)) return testFile
  }

  return findQuestionTestFileFallback(srcRoot, questionNumber)
}

function main() {
  const args = process.argv.slice(2)
  const runOnce = args.includes('--run')
  const questionNumber = parseQuestionNumber(args)

  if (!Number.isInteger(questionNumber) || questionNumber <= 0) {
    console.error('用法: pnpm test:q -- <题号> [--run]')
    process.exit(1)
  }

  const testFile = resolveTestFile(questionNumber)
  if (!testFile) {
    console.error(`未找到第 ${questionNumber} 题的 index.test.ts`) 
    console.error('请确认目录结构或先创建题目目录与测试文件。')
    process.exit(1)
  }

  const relativeTestFile = path.relative(cwd, testFile).split(path.sep).join('/')
  const vitestArgs = runOnce
    ? ['vitest', 'run', relativeTestFile]
    : ['vitest', relativeTestFile]

  console.log(`启动测试: ${relativeTestFile}${runOnce ? ' (单次运行)' : ' (watch 模式)'}`)

  const child = spawn('pnpm', vitestArgs, {
    cwd,
    stdio: 'inherit',
    shell: true,
  })

  child.on('exit', (code) => {
    process.exit(code ?? 1)
  })
}

main()
