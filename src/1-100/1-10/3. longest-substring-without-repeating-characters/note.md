# 个人解法

## 初见思考（方向出错）

认为字符串依次读取即可，算法复杂度虽是`O(n)`，但并不正确
例如`abacab`
下面的算法过程是
1. 读取ab，发现有重复，重置Set
2. 读取ac，发现下一个有重复，重置Set
3. 读取ab，结束
最终得到的最长长度是2，而不是'bac' -> 3

```typescript
export function lengthOfLongestSubstring(s: string): number {
  let i = 0
  let maxCount = 0
  const charSet = new Set<string>()
  for (let j = 0; j <= s.length; ++j) {
    const c = s[j]
    if (!charSet.has(c) && j !== s.length) {
      charSet.add(c)
    } else {
      maxCount = Math.max(maxCount, j - i)
      i = j
    }
  }
  return maxCount
}

```

## 初次正解（暴力解法）

时间复杂度 `O(n^2)`
双重遍历，每次循环左指针保持不动，右指针边右移边往Set中添加字符
遇到重复字符后更新maxCount，清空Set，再右移左指针
相当于从头遍历了不重复子串的每一种可能

```typescript
export function lengthOfLongestSubstring(s: string): number {
  let i = 0
  let maxCount = 0
  const charSet = new Set<string>();
  while (i < s.length) {
    for (let j = i; j < s.length; ++j) {
      const c = s[j]
      if (!charSet.has(c)) charSet.add(c)
      else {
        maxCount = Math.max(maxCount, charSet.size)
        charSet.clear()
        break
      }
    }
    i++
  }
  return Math.max(maxCount, charSet.size)
}

```

## 个人滑动窗口题解

时间复杂度 `O(n)`
*初次接触滑动窗口，感觉非常巧妙*
在上述暴力解法的基础上，我们可以思考🤔
- 如果遇到重复值，不重头再来，而是直接**右移左指针**，会发生什么？
它可能会把重复的子串抛弃，我们有可能得到一个新的不重复子串！

- **右移左指针**会导致我丢失一部分不重复子串的判断吗？
不会！右移左指针，直至当前子串不重复，可以很好地丢弃无用的判断，
因为如果当前子串已经重复，那么它的不重复`子子串`的左侧，已经是无用的数据了
该重复子串和后续的任何字符组合，一定是重复的。

例如`abcabcbb`，模拟窗口如下

```
a
ab
abc
bca <- 遇到重复，逐个丢弃左侧
cab <- 同理
abc <- 同理
bc
cb
b
```

找到其中最长的子串，也就是bca或者cab或者abc
结果就是3

*理论存在，开始实践*

```typescript

export function lengthOfLongestSubstring(s: string): number {
  let left = 0
  let maxLen = 0
  const windowSet = new Set<string>()
  for (let right = 0; right < s.length; right++) {
    const char = s[right]
    while(windowSet.has(char)) {
        const popChar = s[left]
        windowSet.delete(popChar)
        left++
      }
    if (!windowSet.has(char)) {
      windowSet.add(char)
    }
    if (windowSet.size > maxLen) maxLen = windowSet.size
  }
  return maxLen
}

```

## 优化版题解

时间复杂度 `O(n)`
在上述题解的基础上，用map来存储字符的索引
可以快速移动左指针，空间换取时间

```typescript
function lengthOfLongestSubstring(s: string): number {
    const map = new Map()// a, index
    let left = 0
    let max = 0
    for (let i = 0; i < s.length; i++) {
        if (map.has(s[i]) && map.get(s[i]) >= left) {
            left = map.get(s[i]) + 1
        }
        map.set(s[i], i)
        max = Math.max(max, i - left + 1)
    }
    return max
};
```