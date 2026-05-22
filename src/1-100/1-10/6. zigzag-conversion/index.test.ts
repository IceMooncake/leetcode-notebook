import { describe, it, expect } from 'vitest'
import fc from 'fast-check'
import { convert } from './index'
import { failWithContext } from '../../../test-utils/failWithContext'

// 标准题解：按行构造
function referenceConvert(s: string, numRows: number): string {
  if (numRows === 1 || numRows >= s.length) return s

  const rows: string[] = Array.from({ length: numRows }, () => '')
  let row = 0
  let dir = 1

  for (const ch of s) {
    rows[row] += ch
    if (row === 0) dir = 1
    else if (row === numRows - 1) dir = -1
    row += dir
  }

  return rows.join('')
}

describe('6. Z 字形变换', () => {
  it('示例 1: PAYPALISHIRING, 3 => PAHNAPLSIIGYIR', () => {
    expect(convert('PAYPALISHIRING', 3)).toBe('PAHNAPLSIIGYIR')
  })

  it('示例 2: PAYPALISHIRING, 4 => PINALSIGYAHRPI', () => {
    expect(convert('PAYPALISHIRING', 4)).toBe('PINALSIGYAHRPI')
  })

  it('示例 3: A, 1 => A', () => {
    expect(convert('A', 1)).toBe('A')
  })

  it('边界: numRows 大于等于字符串长度', () => {
    expect(convert('ABCD', 4)).toBe('ABCD')
    expect(convert('ABCD', 8)).toBe('ABCD')
  })

  it('边界: numRows = 2', () => {
    expect(convert('ABCDE', 2)).toBe('ACEBD')
  })

  it('属性测试：与标准题解一致', () => {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ,.'
    const charArb = fc.constantFrom(...chars.split(''))

    fc.assert(
      fc.property(
        fc.array(charArb, { minLength: 1, maxLength: 120 }),
        fc.integer({ min: 1, max: 120 }),
        (arr, n) => {
          const s = arr.join('')
          const numRows = Math.min(n, 1000)
          const actual = convert(s, numRows)
          const expected = referenceConvert(s, numRows)
          if (actual !== expected) {
            failWithContext('Z字形变换属性测试失败', {
              input: s,
              inputLength: s.length,
              numRows,
              expected,
              actual,
            })
          }
        },
      ),
      { numRuns: 200, verbose: true },
    )
  })
})
