# 个人解法

## 初见解法

创建一个新列表，遍历两个列表，逐位相加，并处理进位问题。最后返回新列表的头节点。

```typescript
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
```

## 标准解

分为两步，第一步是将两个链表的值相加，第二步是处理进位问题。

```typescript
function addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {
    let carry = 0;
    let cur1 = l1, cur2 = l2;

    const dummy = new ListNode();
    let pre = dummy;

    while (cur1 !== null || cur2 !== null) {
        let sum = 0;
        if (cur1 !== null && cur2 !== null) {
            sum = carry + cur1.val + cur2.val;
            cur1 = cur1.next;
            cur2 = cur2.next;
        } else if (cur1 !== null) {
            sum = carry + cur1.val;
            cur1 = cur1.next;
        } else if (cur2 !== null) {
            sum = carry + cur2.val;
            cur2 = cur2.next;
        }
        pre.next = new ListNode(sum % 10);
        pre = pre.next;
        carry = ~~(sum / 10);
    }

    if (carry !== 0) {
        pre.next = new ListNode(carry);
    }

    return dummy.next;
};
```