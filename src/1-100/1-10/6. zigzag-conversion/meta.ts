import { TAGS } from '../../../meta/tags'
import type { ProblemMeta } from '../../../meta/types'

const meta: ProblemMeta = {
  schemaVersion: 1,
  difficultyScale: '1-10',
  id: 6,
  slug: 'zigzag-conversion',
  title: 'Z 字形变换',
  url: 'https://leetcode.cn/problems/zigzag-conversion/',
  difficulty: 3,
  tags: [TAGS.STRING, TAGS.SIMULATION],
  notes: '主要是索引/方向状态机实现。',
}

export default meta
