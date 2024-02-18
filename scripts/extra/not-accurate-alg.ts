export function getPossiblePastPresentForms(word: string): Array<string> {
  if (/ied$/i.test(word)) {
    return [word.replace(/ied$/i, 'y')]
  }

  // we can not determine some words
  // picnic -> picnicked
  // check -> checked
  if (/cked$/i.test(word)) {
    return [word.slice(0, -1), word.slice(0, -2), word.slice(0, -3)]
  }

  if (/ed$/i.test(word)) {
    // if doubled
    if (word.at(-3) === word.at(-4)) {
      return [word.slice(0, -3), word.slice(0, -1), word.slice(0, -2)]
    }
    return [word.slice(0, -1), word.slice(0, -2)]
  }

  return []
}

export function getPossibleContinuosPresentForms(word: string): Array<string> {
  if (/ying$/i.test(word)) {
    return [word.replace(/ying/i, 'ie'), word.slice(0, -3)]
  }

  if (/cking$/i.test(word)) {
    return [word.slice(0, -3), word.slice(0, -4)]
  }

  if (/ing$/i.test(word)) {
    // if doubled
    // free -> freeing
    // stop -> stopping
    if (word.at(-4) === word.at(-5)) {
      return [word.slice(0, -4), word.slice(0, -3)]
    }
    const baseWord = word.slice(0, -3)
    return [baseWord, `${baseWord}e`]
  }

  return []
}

export function printParseResult(result: Record<string, Array<string>>): void {
  let total = 0
  // eslint-disable-next-line no-console
  console.log('Done')
  // eslint-disable-next-line no-console
  console.log('-----------------------------------------')
  Object.entries(result).forEach(([key, values]) => {
    // @#$
    // eslint-disable-next-line no-console
    console.log(`${key}: ${values.length}`)
    total += values.length
  })
  // eslint-disable-next-line no-console
  console.log('-----------------------------------------')
  // eslint-disable-next-line no-console
  console.log(`Total: ${total}`)
}
