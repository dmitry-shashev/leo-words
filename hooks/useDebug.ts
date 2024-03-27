import { useSelector } from 'react-redux'
import { getCurrentWord } from '@/store/slices/wordsSlice'
import { Debug } from '@/utils/debug'

export function useDebug(): void {
  const currentWord = useSelector(getCurrentWord)
  Debug.saveCurrentWord(currentWord)
}
