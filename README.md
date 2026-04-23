# leetcode-notebook

一个用于长期刷 LeetCode 的 TypeScript 题解仓库。

## 目录结构

按 100 题一组，再按 10 题细分：

```text
src
├── 1-100
│   ├── 1-10
│   │   ├── 1. two-sum
│   │   │   ├── index.empty.ts   # 空白模板（重置用）
│   │   │   ├── index.test.ts    # 标准解 + 测试
│   │   │   ├── index.ts         # 你的当前解法
│   │   │   └── note.md          # 个人笔记（可选）
│   │   ├── 2. add-two-numbers
│   │   └── ...
│   ├── 11-20
│   └── ...
├── 101-200
└── ...
```

## 快速开始

```bash
pnpm install
```

## 常用命令

### 1) 运行测试

```bash
# 监听模式（全量）
pnpm test

# 单次运行（全量）
pnpm test:run
```

### 2) 按题号启动测试（推荐）

```bash
# 监听第 n 题
pnpm test:q -- n

# 例如：监听第 1 题
pnpm test:q -- 1

# 单次运行第 n 题
pnpm test:q:run -- n
```

### 3) 清空题解（用 index.empty.ts 覆盖 index.ts）

```bash
# 预览清空某题（防止误操作）
pnpm clear:solution -- --question 1

# 预览全量清空（防止误操作）
pnpm clear:solution -- --all

# 实际清空某题
pnpm clear:solution:apply -- --question 1

# 实际全量清空
pnpm clear:solution:apply -- --all
```

## 推荐刷题流程

1. fork 到自己的仓库，或者 clone 到本地。
2. pnpm clear:solution:apply -- --all 重置所有题目并提交一个commit。
3. 运行 pnpm test:q -- n 进入某题监听模式。
4. 在对应题目的 index.ts 中编写解法。
5. 根据失败用例迭代修复，直到测试通过。
6. 需要重新练习时，用 clear:solution 重置该题。