export function shuffleArr<T>(arr: ReadonlyArray<T>): Array<T> {
  const result = [...arr]
  result.sort(() => 0.5 - Math.random())
  return result
}
