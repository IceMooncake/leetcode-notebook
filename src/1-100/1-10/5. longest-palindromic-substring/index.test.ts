import { describe, it, expect } from 'vitest'
import fc from 'fast-check'
import { longestPalindrome } from './index'
import { failWithContext } from '../../../test-utils/failWithContext'

function isPalindrome(s: string): boolean {
  let l = 0
  let r = s.length - 1
  while (l < r) {
    if (s[l] !== s[r]) return false
    l++
    r--
  }
  return true
}

// 标准题解：中心扩展
function referenceLongestPalindrome(s: string): string {
  if (s.length <= 1) return s

  let start = 0
  let end = 0

  const expand = (left: number, right: number): [number, number] => {
    while (left >= 0 && right < s.length && s[left] === s[right]) {
      left--
      right++
    }
    return [left + 1, right - 1]
  }

  for (let i = 0; i < s.length; i++) {
    const [l1, r1] = expand(i, i)
    const [l2, r2] = expand(i, i + 1)

    if (r1 - l1 > end - start) {
      start = l1
      end = r1
    }
    if (r2 - l2 > end - start) {
      start = l2
      end = r2
    }
  }

  return s.slice(start, end + 1)
}

// 暴力解仅用于小规模属性测试
function bruteLongestPalindromeLength(s: string): number {
  let best = 1
  for (let i = 0; i < s.length; i++) {
    for (let j = i; j < s.length; j++) {
      const sub = s.slice(i, j + 1)
      if (isPalindrome(sub) && sub.length > best) best = sub.length
    }
  }
  return best
}

describe('5. 最长回文子串', () => {
  it('示例 1: "babad" => "bab" 或 "aba"', () => {
    const ans = longestPalindrome('babad')
    expect(['bab', 'aba']).toContain(ans)
  })

  it('示例 2: "cbbd" => "bb"', () => {
    expect(longestPalindrome('cbbd')).toBe('bb')
  })

  it('单字符', () => {
    expect(longestPalindrome('a')).toBe('a')
  })

  it('全相同字符', () => {
    expect(longestPalindrome('aaaa')).toBe('aaaa')
  })

  it('结果必须是回文且为原串子串', () => {
    const s = 'forgeeksskeegfor'
    const ans = longestPalindrome(s)
    expect(isPalindrome(ans)).toBe(true)
    expect(s.includes(ans)).toBe(true)
    expect(ans.length).toBe(10)
  })

  it('属性测试：与标准题解长度一致', () => {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    const charArb = fc.constantFrom(...chars.split(''))

    fc.assert(
      fc.property(fc.array(charArb, { minLength: 1, maxLength: 80 }), (arr) => {
        const s = arr.join('')
        const actual = longestPalindrome(s)
        const expected = referenceLongestPalindrome(s)

        const palindromeOk = isPalindrome(actual)
        const substringOk = s.includes(actual)
        const lengthOk = actual.length === expected.length

        if (!palindromeOk || !substringOk || !lengthOk) {
          failWithContext('最长回文子串属性测试失败(标准题解对照)', {
            input: s,
            expected,
            actual,
            expectedLength: expected.length,
            actualLength: actual.length,
            palindromeOk,
            substringOk,
            lengthOk,
          })
        }
      }),
      { numRuns: 200, verbose: true },
    )
  })

  it('属性测试：与暴力解长度一致（小规模）', () => {
    const chars = 'ab12'
    const charArb = fc.constantFrom(...chars.split(''))

    fc.assert(
      fc.property(fc.array(charArb, { minLength: 1, maxLength: 16 }), (arr) => {
        const s = arr.join('')
        const actual = longestPalindrome(s)

        const expectedLength = bruteLongestPalindromeLength(s)
        const palindromeOk = isPalindrome(actual)
        const substringOk = s.includes(actual)
        const lengthOk = actual.length === expectedLength

        if (!palindromeOk || !substringOk || !lengthOk) {
          failWithContext('最长回文子串属性测试失败(暴力解对照)', {
            input: s,
            actual,
            expectedLength,
            actualLength: actual.length,
            palindromeOk,
            substringOk,
            lengthOk,
          })
        }
      }),
      { numRuns: 120, verbose: true },
    )
  })
})
