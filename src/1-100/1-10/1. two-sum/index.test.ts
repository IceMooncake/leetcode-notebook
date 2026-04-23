import { describe, it, expect } from 'vitest'
import fc from 'fast-check'
import { twoSum } from './index'

/**
 * 标准题解：哈希表法 O(n)
 * 遍历数组，用 Map 记录已遍历元素的值和下标，
 * 对于当前元素，查找 target - nums[i] 是否已在 Map 中。
 */
function referenceTwoSum(nums: number[], target: number): number[] {
  const map = new Map<number, number>()
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i]
    if (map.has(complement)) {
      return [map.get(complement)!, i]
    }
    map.set(nums[i], i)
  }
  return []
}

/** 将结果排序后比较，因为题目允许任意顺序返回 */
function sorted(arr: number[]): number[] {
  return [...arr].sort((a, b) => a - b)
}

describe('1. 两数之和', () => {
  // ---- 固定测试用例（来自题目示例） ----
  it('示例 1: nums=[2,7,11,15], target=9 → [0,1]', () => {
    expect(sorted(twoSum([2, 7, 11, 15], 9))).toEqual([0, 1])
  })

  it('示例 2: nums=[3,2,4], target=6 → [1,2]', () => {
    expect(sorted(twoSum([3, 2, 4], 6))).toEqual([1, 2])
  })

  it('示例 3: nums=[3,3], target=6 → [0,1]', () => {
    expect(sorted(twoSum([3, 3], 6))).toEqual([0, 1])
  })

  // ---- 边界 / 补充用例 ----
  it('负数: nums=[-1,-2,-3,-4,-5], target=-8 → [2,4]', () => {
    expect(sorted(twoSum([-1, -2, -3, -4, -5], -8))).toEqual([2, 4])
  })

  it('包含零: nums=[0,4,3,0], target=0 → [0,3]', () => {
    expect(sorted(twoSum([0, 4, 3, 0], 0))).toEqual([0, 3])
  })

  it('大数: nums=[1000000000, -1000000000, 3], target=0 → [0,1]', () => {
    expect(sorted(twoSum([1000000000, -1000000000, 3], 0))).toEqual([0, 1])
  })

  // ---- 属性基测试：用 fast-check 随机生成输入，对比标准题解 ----
  it('属性测试：与标准哈希表题解行为一致', () => {
    /**
     * 生成策略：先随机生成一个数组，再随机选两个不同下标，
     * 用它们的和作为 target，确保输入一定有合法解。
     */
    const validInput = fc
      .array(fc.integer({ min: -1e9, max: 1e9 }), { minLength: 2, maxLength: 100 })
      .chain((nums) =>
        fc
          .tuple(
            fc.nat({ max: nums.length - 1 }),
            fc.nat({ max: nums.length - 1 }),
          )
          .filter(([i, j]) => i !== j)
          .map(([i, j]) => ({ nums, target: nums[i] + nums[j] })),
      )

    fc.assert(
      fc.property(validInput, ({ nums, target }) => {
        const result = sorted(twoSum(nums, target))
        const expected = sorted(referenceTwoSum(nums, target))

        // 返回的下标对应元素之和应等于 target
        expect(result).toHaveLength(2)
        expect(nums[result[0]] + nums[result[1]]).toBe(target)

        // 下标应与标准题解一致（排序后比较）
        expect(result).toEqual(expected)
      }),
      { numRuns: 200 },
    )
  })
})