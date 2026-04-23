# 个人解法

## 思路

分析题目，关键在于找到两个数的和等于目标值，最暴力的方法就是尝试每一种组合，即双重遍历。
但另一种思路是利用缓存，在一次遍历后存储每个数与目标值的差值，这样在第二次遍历时就可以快速查找是否存在满足条件的数，即哈希表。

## 解法

### 暴力解法

```typescript
export function twoSum(nums: number[], target: number): number[] {
  for (let i = 0; i < nums.length; ++i) {
    for (let j = 0; j < nums.length; ++j) {
      if (i != j && nums[i] + nums[j] === target) return [i, j]
    }
  }
  return []
}
```

### 哈希表

#### 先存储差值，再查找
```typescript
export function twoSum(nums: number[], target: number): number[] {
  const map = new Map<number, number>()
  nums.forEach((num, index) => map.set(target - num, index))
  for (let i = 0; i < nums.length; ++i) {
    const result = map.get(nums[i])
    if (result && result !== i) return [result, i]
  }
  return []
}
```

#### 优化版，边查边找
```typescript
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
```