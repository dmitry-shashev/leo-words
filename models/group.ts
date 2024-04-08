import { WordScheme } from '@/models/word'
import { z } from 'zod'

export const GroupScheme = z.object({
  groupCount: z.number(),
  groupName: z.string(),
  words: z.array(WordScheme),
})

export type Group = z.infer<typeof GroupScheme>
