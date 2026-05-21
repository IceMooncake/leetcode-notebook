import { TAGS } from '../../../meta/tags'
import type { ProblemMeta } from '../../../meta/types'

const meta: ProblemMeta = {
  schemaVersion: 1,
  difficultyScale: '1-10',
  id: 5,
  slug: 'longest-palindromic-substring',
  title: '最长回文子串',
  url: 'https://leetcode.cn/problems/longest-palindromic-substring/',
  difficulty: 5,
  tags: [TAGS.STRING, TAGS.PALINDROME, TAGS.TWO_POINTERS],
  notes: '中心扩展更直观，DP 作为可选方案。',
}

export default meta
