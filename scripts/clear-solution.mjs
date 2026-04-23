#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'

const cwd = process.cwd()
const srcRoot = path.join(cwd, 'src')

function parseArgs(argv) {
  let all = false
  let apply = false
  let question = null

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i]

    if (arg === '--all') {
      all = true
      continue
    }

    if (arg === '--apply') {
      apply = true
      continue
    }

    if (arg === '--question' || arg === '-q') {
      const next = argv[i + 1]
      if (!next || !/^\d+$/.test(next)) {
        return { error: 'Missing or invalid question number for --question' }
      }
      question = Number(next)
      i++
      continue
    }

    if (/^\d+$/.test(arg)) {
      question = Number(arg)
      continue
    }

    return { error: `Unknown argument: ${arg}` }
  }

  if (all && question !== null) {
    return { error: 'Use either --all or --question <n>, not both' }
  }

  if (!all && question === null) {
    return { error: 'Specify --all or --question <n> (or positional <n>)' }
  }

  return { all, apply, question }
}

function getQuestionNumberFromDirName(dirName) {
  const m = dirName.match(/^(\d+)(?:\.|\s|$)/)
  if (!m) return null
  return Number(m[1])
}

function collectQuestionDirs(rootDir) {
  const stack = [rootDir]
  const found = []

  while (stack.length > 0) {
    const current = stack.pop()
    if (!current || !fs.existsSync(current)) continue

    const entries = fs.readdirSync(current, { withFileTypes: true })
    const hasIndex = entries.some((e) => e.isFile() && e.name === 'index.ts')
    const hasEmpty = entries.some((e) => e.isFile() && e.name === 'index.empty.ts')

    if (hasIndex && hasEmpty) {
      found.push(current)
      continue
    }

    for (const entry of entries) {
      if (entry.isDirectory()) {
        stack.push(path.join(current, entry.name))
      }
    }
  }

  found.sort((a, b) => a.localeCompare(b))
  return found
}

function toPosixRelative(absPath) {
  return path.relative(cwd, absPath).split(path.sep).join('/')
}

function main() {
  const parsed = parseArgs(process.argv.slice(2))
  if ('error' in parsed) {
    console.error(parsed.error)
    console.error('Usage:')
    console.error('  pnpm clear:solution -- --question <n> [--apply]')
    console.error('  pnpm clear:solution -- <n> [--apply]')
    console.error('  pnpm clear:solution -- --all [--apply]')
    process.exit(1)
  }

  if (!fs.existsSync(srcRoot)) {
    console.error('src directory not found')
    process.exit(1)
  }

  const allQuestionDirs = collectQuestionDirs(srcRoot)
  const targets = parsed.all
    ? allQuestionDirs
    : allQuestionDirs.filter((dir) => {
        const n = getQuestionNumberFromDirName(path.basename(dir))
        return n === parsed.question
      })

  if (targets.length === 0) {
    const label = parsed.all ? 'all questions' : `question ${parsed.question}`
    console.error(`No matching directories found for ${label}`)
    process.exit(1)
  }

  if (!parsed.apply) {
    console.log('Dry-run mode. No files were changed.')
    console.log('Targets:')
    for (const dir of targets) {
      console.log(`  ${toPosixRelative(path.join(dir, 'index.ts'))}`)
    }
    console.log('Add --apply to perform overwrite from index.empty.ts to index.ts')
    return
  }

  for (const dir of targets) {
    const emptyFile = path.join(dir, 'index.empty.ts')
    const indexFile = path.join(dir, 'index.ts')
    const content = fs.readFileSync(emptyFile, 'utf8')
    fs.writeFileSync(indexFile, content, 'utf8')
    console.log(`Overwritten: ${toPosixRelative(indexFile)}`)
  }

  console.log(`Done. Updated ${targets.length} file(s).`)
}

main()
