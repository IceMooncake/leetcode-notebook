/**
 * 2. 两数相加 (Add Two Numbers)
 * 难度：4/10
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
  let p1 = l1
  let p2 = l2
  const newHead = new ListNode(0)
  let p3: ListNode | null = newHead
  while (p1 || p2) {
    if (!p3) return null
    p3.val += (p1?.val || 0) + (p2?.val || 0)
    if (p3.val > 9) {
      p3.val %= 10
      p3.next = new ListNode(1)
    } else if (p1?.next || p2?.next) {
      p3.next = new ListNode(0)
    }
    p3 = p3.next
    p1 && (p1 = p1?.next)
    p2 && (p2 = p2?.next)
  }

  return newHead
}
