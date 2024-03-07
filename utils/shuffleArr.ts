export function shuffleArr<T>(arr: ReadonlyArray<T>): Array<T> {
  return arr
    .map((v) => ({
      index: Math.random(),
      v,
    }))
    .sort((a, b) => a.index - b.index)
    .map((elem) => elem.v)
}
