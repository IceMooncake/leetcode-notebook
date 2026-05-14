import { TAGS } from '../../../meta/tags'
import type { ProblemMeta } from '../../../meta/types'

const meta: ProblemMeta = {
  schemaVersion: 1,
  difficultyScale: '1-10',
  id: 3,
  slug: 'longest-substring-without-repeating-characters',
  title: '无重复字符的最长子串',
  url: 'https://leetcode.cn/problems/longest-substring-without-repeating-characters/',
  difficulty: 4,
  tags: [TAGS.STRING, TAGS.SLIDING_WINDOW, TAGS.HASH_MAP],
  notes: '经典滑窗模板，注意左边界更新策略。',
}

export default meta
