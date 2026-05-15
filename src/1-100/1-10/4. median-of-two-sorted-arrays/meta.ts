import { TAGS } from '../../../meta/tags'
import type { ProblemMeta } from '../../../meta/types'

const meta: ProblemMeta = {
  schemaVersion: 1,
  difficultyScale: '1-10',
  id: 4,
  slug: 'median-of-two-sorted-arrays',
  title: '寻找两个正序数组的中位数',
  url: 'https://leetcode.cn/problems/median-of-two-sorted-arrays/',
  difficulty: 9,
  tags: [TAGS.ARRAY, TAGS.BINARY_SEARCH, TAGS.PARTITION],
  notes: '二分划分边界细节多，容错要求高。',
}

export default meta
