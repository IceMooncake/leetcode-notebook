#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'

const cwd = process.cwd()
const metaPath = path.join(cwd, 'src', 'problem-metadata.json')

function main() {
  if (!fs.existsSync(metaPath)) {
    console.error('metadata file not found: src/problem-metadata.json')
    process.exit(1)
  }

  const raw = fs.readFileSync(metaPath, 'utf8')
  const meta = JSON.parse(raw)

  const arg = process.argv[2]
  if (!arg) {
    console.log(JSON.stringify(meta, null, 2))
    return
  }

  const id = Number(arg)
  if (!Number.isInteger(id) || id <= 0) {
    console.error('usage: pnpm meta -- <id>')
    process.exit(1)
  }

  const problem = meta.problems.find((p) => p.id === id)
  if (!problem) {
    console.error(`problem ${id} not found`)
    process.exit(1)
  }

  console.log(JSON.stringify(problem, null, 2))
}

main()
