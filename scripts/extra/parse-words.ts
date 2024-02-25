import { Word } from '@/models/word'
import { WORDS_PATH } from '@/utils/constants'
import path from 'path'
import pluralize from 'pluralize'
import {
  getPossibleContinuosPresentForms,
  getPossiblePastPresentForms,
} from '@/scripts/extra/not-accurate-alg'
import { readFileSync } from 'fs'

const PROJECT_PATH = path.resolve('./')

export function parseWords(text: string): {
  regular: Array<string>
  phrasal: Array<string>
  idioms: Array<string>
} {
  const currentAddedWords = JSON.parse(
    readFileSync(`${PROJECT_PATH}/${WORDS_PATH}`, 'utf-8')
  ).map((w: Word) => w.wordValue.toLowerCase().trim())
  const blockList: ReadonlyArray<string> = JSON.parse(
    readFileSync(`${PROJECT_PATH}/content/block-list.json`, 'utf-8')
  )
  const irregularVerbs: ReadonlyArray<string> = JSON.parse(
    readFileSync(`${PROJECT_PATH}/scripts/extra/irregular-verbs.json`, 'utf-8')
  ).flat()
  const wordsForExclude = [
    ...currentAddedWords,
    ...blockList,
    ...irregularVerbs,
  ]

  const regular = findRegularWords(text, wordsForExclude)
  const phrasal = findPhrasalVerbs(text, wordsForExclude)
  const idioms = findIdioms(text, wordsForExclude)

  return {
    regular,
    phrasal,
    idioms,
  }
}

function findRegularWords(
  text: string,
  wordsForExclude: Array<string>
): Array<string> {
  const webstersDictionary = JSON.parse(
    readFileSync(
      `${PROJECT_PATH}/scripts/extra/websters-dictionary.json`,
      'utf-8'
    )
  )
  let parsedWords = text
    .replace(/[^a-zA-Z\-']/g, ' ')
    .split(/[\n\s]/)
    .map((w) => w.trim())
    .map((w) => w.toLowerCase())
    // should start and end with a letter
    .filter((w) => /^[a-z].*[a-z]$/.test(w))
    // .filter((w) => /[a-z]$/.test(w))
    // more than 3 letters
    .filter((w) => w.length > 2)
  const result: Array<string> = parsedWords
    .filter((w) => !wordsForExclude.includes(w))
    // get rid of plural forms
    .filter((w) => {
      if (pluralize.isSingular(w)) {
        return true
      }
      const singular = pluralize.singular(w)
      return !wordsForExclude.includes(singular)
    })
    // get rid of past forms
    .filter((w) => {
      const possible = getPossiblePastPresentForms(w)
      return !wordsForExclude.some((w) => possible.includes(w))
    })
    // get rid of continuous
    .filter((w) => {
      const possible = getPossibleContinuosPresentForms(w)
      return !wordsForExclude.some((w) => possible.includes(w))
    })
    // check if it is a real word
    .filter((w) => w in webstersDictionary)

  return Array.from(new Set(result))
}

function findPhrasalVerbs(
  text: string,
  wordsForExclude: Array<string>
): Array<string> {
  const textToCheck = text.toLowerCase()
  const phrasalDictionary: ReadonlyArray<Record<string, unknown>> = JSON.parse(
    readFileSync(
      `${PROJECT_PATH}/scripts/extra/phrasal-verb-dictionary.json`,
      'utf-8'
    )
  )
  const result: Array<string> = []

  Object.entries(phrasalDictionary).forEach(([key, value]): void => {
    if (wordsForExclude.includes(key)) {
      return
    }
    let arrToSearch: Array<string> = [key]
    if (Array.isArray(value.derivatives)) {
      arrToSearch = arrToSearch.concat(value.derivatives)
    }
    if (arrToSearch.some((w) => textToCheck.includes(w))) {
      result.push(key)
    }
  })

  return Array.from(new Set(result))
}

function findIdioms(
  text: string,
  wordsForExclude: Array<string>
): Array<string> {
  const textToCheck = text.toLowerCase()
  const idiomsDictionary: ReadonlyArray<Record<string, unknown>> = JSON.parse(
    readFileSync(
      `${PROJECT_PATH}/scripts/extra/idioms-dictionary.json`,
      'utf-8'
    )
  )

  const result: Array<string> = []
  Object.keys(idiomsDictionary).forEach((w) => {
    const value = w.toLowerCase()
    if (wordsForExclude.includes(value)) {
      return
    }
    if (textToCheck.includes(value)) {
      result.push(value)
    }
  })
  return Array.from(new Set(result))
}
