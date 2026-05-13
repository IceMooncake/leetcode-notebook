export const TAGS = {
  ARRAY: 'array',
  HASH_MAP: 'hash-map',
  LINKED_LIST: 'linked-list',
  STRING: 'string',
  SLIDING_WINDOW: 'sliding-window',
  BINARY_SEARCH: 'binary-search',
  PARTITION: 'partition',
  PALINDROME: 'palindrome',
  TWO_POINTERS: 'two-pointers',
  SIMULATION: 'simulation',
} as const

export type Tag = (typeof TAGS)[keyof typeof TAGS]
