import type { Tag } from './tags'

export interface ProblemMeta {
  schemaVersion: 1
  difficultyScale: '1-10'
  id: number
  slug: string
  title: string
  url: string
  customDifficulty: number
  tags: Tag[]
  notes: string
}
