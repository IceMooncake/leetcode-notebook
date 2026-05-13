export function failWithContext(title: string, context: Record<string, unknown>): never {
  const lines = [`[${title}]`]
  for (const [key, value] of Object.entries(context)) {
    const formatted =
      typeof value === 'string'
        ? `"${value}"`
        : JSON.stringify(value, (_, v) => (typeof v === 'bigint' ? `${v}n` : v))
    lines.push(`[${key}]: ${formatted ?? String(value)}`)
  }
  throw new Error(lines.join('\n'))
}
