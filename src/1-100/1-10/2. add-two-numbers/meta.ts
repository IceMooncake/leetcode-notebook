import { TAGS } from '../../../meta/tags'
import type { ProblemMeta } from '../../../meta/types'

const meta: ProblemMeta = {
  schemaVersion: 1,
  difficultyScale: '1-10',
  id: 2,
  slug: 'add-two-numbers',
  title: '两数相加',
  url: 'https://leetcode.cn/problems/add-two-numbers/',
  customDifficulty: 4,
  tags: [TAGS.LINKED_LIST, TAGS.SIMULATION],
  notes: '处理进位和链表尾部对齐。',
}

export default meta
