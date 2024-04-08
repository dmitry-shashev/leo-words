import { toStringPreprocess } from '@/utils/preprocessFunctions'
import { z } from 'zod'

export const WordScheme = z.object({
  id: z.number(),
  combinedTranslation: z.preprocess(toStringPreprocess, z.string()),
  wordValue: z.string(),
  transcription: z.preprocess(toStringPreprocess, z.string()),
  created: z.number(),
  // png
  picture: z.string(),
  // mp3
  pronunciation: z.string().default(''),
})

export type Word = z.infer<typeof WordScheme>
