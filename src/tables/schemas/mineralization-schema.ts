import { z } from 'zod'

export const MineralizationRecordSchema = z
	.object({
		depthFrom: z.coerce.number().min(0, 'Must be non-negative'),
		depthTo: z.coerce.number().min(0, 'Must be non-negative'),
		minType: z
			.string()
			.min(1, 'Required')
			.array()
			.min(1, 'Please select at least one mineral type.'),
		minAbunPerc: z.coerce
			.number()
			.min(0, 'Must be between 0 and 100')
			.max(100, 'Must be between 0 and 100'),
		minStyle: z
			.string()
			.min(1, 'Required')
			.array()
			.min(1, 'Please select at least one style.'),
	})
	.refine((data) => data.depthTo > data.depthFrom, {
		message: 'Depth To must be greater than Depth From',
		path: ['depthTo'],
	})

export const MineralizationFormSchema = z
	.object({
		records: z
			.array(MineralizationRecordSchema)
			.min(1, 'Add at least one record'),
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

export type MineralizationRecord = z.infer<typeof MineralizationRecordSchema>

export type MineralizationFormValues = z.infer<typeof MineralizationFormSchema>
