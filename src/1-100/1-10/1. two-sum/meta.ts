import { TAGS } from '../../../meta/tags'
import type { ProblemMeta } from '../../../meta/types'

const meta: ProblemMeta = {
  schemaVersion: 1,
  difficultyScale: '1-10',
  id: 1,
  slug: 'two-sum',
  title: '两数之和',
  url: 'https://leetcode.cn/problems/two-sum/',
  customDifficulty: 2,
  tags: [TAGS.ARRAY, TAGS.HASH_MAP],
  notes: '入门题，重点是一次遍历与查补数。',
}

export default meta
