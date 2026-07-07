export function isPlaceholder(value: string): boolean {
  return value.includes('[[') || value.includes(']]')
}
