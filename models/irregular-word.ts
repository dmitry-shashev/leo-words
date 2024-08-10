import { z } from 'zod'

export const IrregularWordScheme = z.object({
  id: z.number(),
  infinitive: z.string(),
  pastSimple: z.string(),
  pastParticiple: z.string(),
})

export type IrregularWord = z.infer<typeof IrregularWordScheme>
