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
const WORDS_PATH_FULL = `${PROJECT_PATH}/${WORDS_PATH}`
const BLOCK_LIST_PATH = `${PROJECT_PATH}/scripts/extra/block-list.json`
const IRREGULAR_VERBS_PATH = `${PROJECT_PATH}/scripts/extra/irregular-verbs.json`
const WEBSTERS_DICTIONARY = `${PROJECT_PATH}/scripts/extra/websters-dictionary.json`

function getWords(text: string): Array<string> {
  let result = text
    .replace(/[^a-zA-Z\-']/g, ' ')
    .split(/[\n\s]/)
    .map((w) => w.trim())
    .filter((w) => !/'/.test(w))
    // get rid of camelcase
    .filter((w) => !/[a-z][A-Z]/.test(w))
    .map((w) => w.toLowerCase())
    // no vowels
    .filter((w) => /[aeiouy]/.test(w))
    // no consonants
    .filter((w) => /[bcdfghjklmnpqrstvwxyz]/.test(w))
    // remove getters and setters
    .filter((w) => !/^get.*/.test(w))
    .filter((w) => !/^set.*/.test(w))
    // can not have 4 consonants in a row
    .filter((w) => !/[bcdfghjklmnpqrstvwxyz]{4,}/.test(w))
    // can not have 3 same letters in a row
    .filter((w) => !/([a-zA-Z])(?=(?:.*?\1){2})/.test(w))
    // should start and end with a letter
    .filter((w) => /^[a-z]/.test(w))
    .filter((w) => /[a-z]$/.test(w))
    // more than 3 letters
    .filter((w) => w.length > 3)
  result = Array.from(new Set(result))
  return result
}

export function parseWords(text: string): Array<string> {
  const currentAddedWords = JSON.parse(
    readFileSync(WORDS_PATH_FULL, 'utf-8')
  ).map((w: Word) => w.wordValue.toLowerCase().trim())

  const blacklist: ReadonlyArray<string> = JSON.parse(
    readFileSync(BLOCK_LIST_PATH, 'utf-8')
  )
  const wordsForExclude = [...currentAddedWords, ...blacklist]

  const irregularVerbs: ReadonlyArray<string> = JSON.parse(
    readFileSync(IRREGULAR_VERBS_PATH, 'utf-8')
  ).flat()

  const webstersDictionary = JSON.parse(
    readFileSync(WEBSTERS_DICTIONARY, 'utf-8')
  )

  let parsedWords = getWords(text)
  return (
    parsedWords
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
      // get rid of irregular verbs
      .filter((w) => {
        return !irregularVerbs.includes(w)
      })
      // check if it is a real word
      .filter((w) => w in webstersDictionary)
  )
}
