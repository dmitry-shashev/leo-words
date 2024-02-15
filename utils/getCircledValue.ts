export function getNextCircledValue<T extends { id: number }>(
  current: T,
  arr: ReadonlyArray<T>
): { value: T; reset: boolean } {
  let index = arr.findIndex((v) => v.id === current.id) + 1
  let reset = false
  if (index >= arr.length) {
    reset = true
    index = 0
  }
  return {
    value: arr[index]!,
    reset,
  }
}

export function getPrevCircledValue<T extends { id: number }>(
  current: T,
  arr: ReadonlyArray<T>
): { value: T; reset: boolean } {
  let index = arr.findIndex((v) => v.id === current.id) - 1
  let reset = false
  if (index <= 0) {
    reset = true
    index = 0
  }
  return {
    value: arr[index]!,
    reset,
  }
}
