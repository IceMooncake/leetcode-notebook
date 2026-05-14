import { describe, it, expect } from 'vitest'
import fc from 'fast-check'
import { lengthOfLongestSubstring } from './index'
import { failWithContext } from '../../../test-utils/failWithContext'

// 标准题解：滑动窗口 + 字符最后出现位置
function referenceLengthOfLongestSubstring(s: string): number {
  const last = new Map<string, number>()
  let left = 0
  let best = 0

  for (let right = 0; right < s.length; right++) {
    const ch = s[right]
    if (last.has(ch)) {
      left = Math.max(left, last.get(ch)! + 1)
    }
    last.set(ch, right)
    best = Math.max(best, right - left + 1)
  }

  return best
}

// 暴力解仅用于属性测试对照（小规模输入）
function bruteForceLength(s: string): number {
  let best = 0
  for (let i = 0; i < s.length; i++) {
    const seen = new Set<string>()
    for (let j = i; j < s.length; j++) {
      if (seen.has(s[j])) break
      seen.add(s[j])
      best = Math.max(best, j - i + 1)
    }
  }
  return best
}

describe('3. 无重复字符的最长子串', () => {
  it('示例 1: "abcabcbb" => 3', () => {
    expect(lengthOfLongestSubstring('abcabcbb')).toBe(3)
  })

  it('示例 2: "bbbbb" => 1', () => {
    expect(lengthOfLongestSubstring('bbbbb')).toBe(1)
  })

  it('示例 3: "pwwkew" => 3', () => {
    expect(lengthOfLongestSubstring('pwwkew')).toBe(3)
  })

  it('空串 => 0', () => {
    expect(lengthOfLongestSubstring('')).toBe(0)
  })

  it('包含空格和符号', () => {
    expect(lengthOfLongestSubstring('a b!a')).toBe(4)
  })

  it('属性测试：与标准题解一致', () => {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 !@#$%^&*()_+-=[]{};:\\",.<>/?'
    const charArb = fc.constantFrom(...chars.split(''))

    fc.assert(
      fc.property(fc.array(charArb, { minLength: 0, maxLength: 80 }), (arr) => {
        const s = arr.join('')
        const actual = lengthOfLongestSubstring(s)
        const expected = referenceLengthOfLongestSubstring(s)
        if (actual !== expected) {
          failWithContext('无重复最长子串属性测试失败(标准题解对照)', {
            input: s,
            inputLength: s.length,
            expected,
            actual,
            uniqueChars: Array.from(new Set(s)),
          })
        }
      }),
      { numRuns: 200, verbose: true },
    )
  })

  it('属性测试：与暴力解一致（小规模）', () => {
    const chars = 'abc123'
    const charArb = fc.constantFrom(...chars.split(''))

    fc.assert(
      fc.property(fc.array(charArb, { minLength: 0, maxLength: 18 }), (arr) => {
        const s = arr.join('')
        const actual = lengthOfLongestSubstring(s)
        const expected = bruteForceLength(s)
        if (actual !== expected) {
          failWithContext('无重复最长子串属性测试失败(暴力解对照)', {
            input: s,
            inputLength: s.length,
            expected,
            actual,
            uniqueChars: Array.from(new Set(s)),
          })
        }
      }),
      { numRuns: 120, verbose: true },
    )
  })
})
