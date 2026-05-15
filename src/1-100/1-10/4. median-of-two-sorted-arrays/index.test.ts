import { describe, it, expect } from 'vitest'
import fc from 'fast-check'
import { findMedianSortedArrays } from './index'
import { failWithContext } from '../../../test-utils/failWithContext'

// 标准题解：二分划分法 O(log(min(m,n)))
function referenceFindMedianSortedArrays(nums1: number[], nums2: number[]): number {
  if (nums1.length > nums2.length) {
    return referenceFindMedianSortedArrays(nums2, nums1)
  }

  const m = nums1.length
  const n = nums2.length
  const totalLeft = Math.floor((m + n + 1) / 2)

  let left = 0
  let right = m

  while (left <= right) {
    const i = Math.floor((left + right) / 2)
    const j = totalLeft - i

    const nums1LeftMax = i === 0 ? -Infinity : nums1[i - 1]
    const nums1RightMin = i === m ? Infinity : nums1[i]
    const nums2LeftMax = j === 0 ? -Infinity : nums2[j - 1]
    const nums2RightMin = j === n ? Infinity : nums2[j]

    if (nums1LeftMax <= nums2RightMin && nums2LeftMax <= nums1RightMin) {
      if ((m + n) % 2 === 1) {
        return Math.max(nums1LeftMax, nums2LeftMax)
      }
      return (Math.max(nums1LeftMax, nums2LeftMax) + Math.min(nums1RightMin, nums2RightMin)) / 2
    }

    if (nums1LeftMax > nums2RightMin) {
      right = i - 1
    } else {
      left = i + 1
    }
  }

  return 0
}

function bruteMedian(nums1: number[], nums2: number[]): number {
  const merged = [...nums1, ...nums2].sort((a, b) => a - b)
  const len = merged.length
  if (len % 2 === 1) return merged[Math.floor(len / 2)]
  return (merged[len / 2 - 1] + merged[len / 2]) / 2
}

describe('4. 寻找两个正序数组的中位数', () => {
  it('示例 1: [1,3] 和 [2] => 2', () => {
    expect(findMedianSortedArrays([1, 3], [2])).toBe(2)
  })

  it('示例 2: [1,2] 和 [3,4] => 2.5', () => {
    expect(findMedianSortedArrays([1, 2], [3, 4])).toBe(2.5)
  })

  it('一边为空数组', () => {
    expect(findMedianSortedArrays([], [1])).toBe(1)
    expect(findMedianSortedArrays([2, 3], [])).toBe(2.5)
  })

  it('包含负数与重复值', () => {
    expect(findMedianSortedArrays([-5, -2, -2], [-3, -1])).toBe(-2)
  })

  it('属性测试：与标准题解一致', () => {
    const sortedArr = fc
      .array(fc.integer({ min: -1_000_000, max: 1_000_000 }), { minLength: 0, maxLength: 100 })
      .map((arr) => arr.sort((a, b) => a - b))

    fc.assert(
      fc.property(sortedArr, sortedArr, (a, b) => {
        if (a.length + b.length === 0) return

        const actual = findMedianSortedArrays(a, b)
        const expected = referenceFindMedianSortedArrays(a, b)
        if (actual !== expected) {
          failWithContext('中位数属性测试失败(标准题解对照)', {
            nums1: a,
            nums2: b,
            expected,
            actual,
          })
        }
      }),
      { numRuns: 200, verbose: true },
    )
  })

  it('属性测试：与暴力合并一致', () => {
    const sortedArr = fc
      .array(fc.integer({ min: -1000, max: 1000 }), { minLength: 0, maxLength: 40 })
      .map((arr) => arr.sort((a, b) => a - b))

    fc.assert(
      fc.property(sortedArr, sortedArr, (a, b) => {
        if (a.length + b.length === 0) return
        const actual = findMedianSortedArrays(a, b)
        const expected = bruteMedian(a, b)
        if (actual !== expected) {
          failWithContext('中位数属性测试失败(暴力解对照)', {
            nums1: a,
            nums2: b,
            expected,
            actual,
          })
        }
      }),
      { numRuns: 120, verbose: true },
    )
  })
})
