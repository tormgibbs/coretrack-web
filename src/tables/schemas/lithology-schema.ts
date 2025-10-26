import { z } from 'zod'

const LithologyRecordSchema = z
	.object({
		depthFrom: z.coerce.number().min(0, 'Must be non-negative'),
		depthTo: z.coerce.number().min(0, 'Must be non-negative'),
		rockType: z.string().min(1, 'Required'),
	})
	.refine((data) => data.depthTo > data.depthFrom, {
		message: 'Depth To must be greater than Depth From',
		path: ['depthTo'], // This targets the specific field
	})

export const LithologyFormSchema = z
	.object({
		records: z.array(LithologyRecordSchema).min(1, 'Add at least one record'),
	})
	.superRefine((data, ctx) => {
		const sortedRecords = [...data.records].sort(
			(a, b) => a.depthFrom - b.depthFrom,
		)

		for (let i = 0; i < sortedRecords.length - 1; i++) {
			const current = sortedRecords[i]
			const next = sortedRecords[i + 1]
			if (current.depthTo > next.depthFrom) {
				const originalIndex = data.records.indexOf(next)

				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: `Overlaps with another depth range (${current.depthFrom}-${current.depthTo})`,
					path: ['records', originalIndex, 'depthFrom'],
				})
			}
		}
	})

export type LithologyRecord = z.infer<typeof LithologyRecordSchema>

export type LithologyFormValues = z.infer<typeof LithologyFormSchema>
