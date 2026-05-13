/**
 * 2. 两数相加 (Add Two Numbers)
 * 难度：中等
 * 链接：https://leetcode.cn/problems/add-two-numbers/
 *
 * 任务摘要：
 * 两个链表按低位在前存储整数，每个节点一位，计算它们的和并返回同格式链表。
 *
 * 说明：
 * - 链表非空
 * - 节点值范围 0~9
 * - 结果需要正确处理进位
 */
export class ListNode {
  val: number
  next: ListNode | null

  constructor(val = 0, next: ListNode | null = null) {
    this.val = val
    this.next = next
  }
}

export function addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {
  return null
}
