/**
 * 1. 两数之和 (Two Sum)
 * 难度：简单
 * 链接：https://leetcode.cn/problems/two-sum/
 *
 * 任务摘要：
 * 给定数组与目标值，找出两项下标使两项之和等于目标。
 *
 * 说明：
 * - 默认只有一组有效答案
 * - 同一个下标不能重复使用
 * - 返回顺序不限
 */
export function twoSum(nums: number[], target: number): number[] {
  const map = new Map<number, number>()
  for (let i = 0; i < nums.length; ++i) {
    if (map.has(nums[i])) {
      return [map.get(nums[i])!, i]
    }
    map.set(target - nums[i], i)
  }
  return []
}