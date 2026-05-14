/**
 * 3. 无重复字符的最长子串 (Longest Substring Without Repeating Characters)
 * 难度：4/10
 * 链接：https://leetcode.cn/problems/longest-substring-without-repeating-characters/
 *
 * 任务摘要：
 * 对字符串求最长“连续片段”长度，要求片段内字符不重复。
 *
 * 说明：
 * - 结果是长度，不是子串本身
 * - 子序列不计入答案
 */
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
