import { describe, it, expect } from 'vitest'
import fc from 'fast-check'
import { addTwoNumbers, ListNode } from './index'

function fromArray(values: number[]): ListNode | null {
  const dummy = new ListNode(0)
  let tail = dummy
  for (const v of values) {
    tail.next = new ListNode(v)
    tail = tail.next
  }
  return dummy.next
}

function toArray(head: ListNode | null): number[] {
  const out: number[] = []
  let cur = head
  while (cur) {
    out.push(cur.val)
    cur = cur.next
  }
  return out
}

function reverseDigitsToBigInt(values: number[]): bigint {
  return BigInt(values.slice().reverse().join(''))
}

// 标准题解
function referenceAddTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {
  const dummy = new ListNode(0)
  let tail = dummy
  let p = l1
  let q = l2
  let carry = 0

  while (p || q || carry !== 0) {
    const x = p ? p.val : 0
    const y = q ? q.val : 0
    const sum = x + y + carry

    carry = Math.floor(sum / 10)
    tail.next = new ListNode(sum % 10)
    tail = tail.next

    p = p ? p.next : null
    q = q ? q.next : null
  }

  return dummy.next
}

function runCase(a: number[], b: number[]): number[] {
  const result = addTwoNumbers(fromArray(a), fromArray(b))
  return toArray(result)
}

describe('2. 两数相加', () => {
  // ---- 固定测试用例（来自题目示例） ----
  it('示例 1: [2,4,3] + [5,6,4] => [7,0,8]', () => {
    expect(runCase([2, 4, 3], [5, 6, 4])).toEqual([7, 0, 8])
  })

  it('示例 2: [0] + [0] => [0]', () => {
    expect(runCase([0], [0])).toEqual([0])
  })

  it('示例 3: [9,9,9,9,9,9,9] + [9,9,9,9] => [8,9,9,9,0,0,0,1]', () => {
    expect(runCase([9, 9, 9, 9, 9, 9, 9], [9, 9, 9, 9])).toEqual([8, 9, 9, 9, 0, 0, 0, 1])
  })

  // ---- 补充测试 ----
  it('处理进位链: [9,9,9] + [1] => [0,0,0,1]', () => {
    expect(runCase([9, 9, 9], [1])).toEqual([0, 0, 0, 1])
  })

  it('不同长度: [1,8] + [0] => [1,8]', () => {
    expect(runCase([1, 8], [0])).toEqual([1, 8])
  })

  // ---- 属性基测试：与标准题解一致 ----
  it('属性测试：与标准链表加法题解行为一致', () => {
    const digits = fc.array(fc.integer({ min: 0, max: 9 }), { minLength: 1, maxLength: 50 })

    fc.assert(
      fc.property(digits, digits, (a, b) => {
        const actualList = addTwoNumbers(fromArray(a), fromArray(b))
        const expectedList = referenceAddTwoNumbers(fromArray(a), fromArray(b))

        const actual = toArray(actualList)
        const expected = toArray(expectedList)

        expect(actual).toEqual(expected)

        // 额外校验：输出链表反转后对应的数值应等于两输入数值之和
        const aNum = reverseDigitsToBigInt(a)
        const bNum = reverseDigitsToBigInt(b)
        const actualNum = reverseDigitsToBigInt(actual)
        expect(actualNum).toBe(aNum + bNum)
      }),
      { numRuns: 200 },
    )
  })
})
