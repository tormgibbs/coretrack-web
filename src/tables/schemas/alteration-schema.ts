import { z } from 'zod'

const AlterationRecordSchema = z
	.object({
		depthFrom: z.coerce.number().min(0, 'Must be non-negative'),
		depthTo: z.coerce.number().min(0, 'Must be non-negative'),
		alterationType: z
			.string()
			.min(1, 'Required')
			.array()
			.min(1, 'Please select at least one alteration type.'),
		alterationIntensity: z
			.string()
			.min(1, 'Required')
			.array()
			.min(1, 'Please select at least one one intensity.'),
	})
	.refine((data) => data.depthTo > data.depthFrom, {
		message: 'Depth To must be greater than Depth From',
		path: ['depthTo'],
	})

export const AlterationFormSchema = z
	.object({
		records: z.array(AlterationRecordSchema).min(1, 'Add at least one record'),
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

export type AlterationRecord = z.infer<typeof AlterationRecordSchema>

export type AlterationFormValues = z.infer<typeof AlterationFormSchema>
