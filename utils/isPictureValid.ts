import { Word } from '@/models/word'

function isPictureValid(src?: string): boolean {
  return !!src && !src.endsWith('f714.png') && !src.endsWith('/0.png')
}

export function isWordPictureValid(word: Word): boolean {
  return isPictureValid(word.picture)
}

export function isWordPictureInvalid(word: Word): boolean {
  return !isPictureValid(word.picture)
}
