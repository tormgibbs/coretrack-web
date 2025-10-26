import { z } from 'zod'

export const RecoveryRecordSchema = z
	.object({
		depthFrom: z.coerce.number().min(0, 'Must be non-negative'),
		depthTo: z.coerce.number().min(0, 'Must be non-negative'),
		totalRecLength: z.coerce
			.number()
			.min(0, 'Must be non-negative')
			.nullable()
			.default(null),
	})
	.refine((data) => data.depthTo > data.depthFrom, {
		message: 'Depth To must be greater than Depth From',
		path: ['depthTo'],
	})
	.refine(
		(data) =>
			data.totalRecLength === null ||
			data.totalRecLength <= data.depthTo - data.depthFrom,
		{
			message:
				'Recovered length cannot exceed run length (Depth To - Depth From)',
			path: ['totalRecLength'],
		},
	)

export const RecoveryFormSchema = z
	.object({
		records: z.array(RecoveryRecordSchema).min(1, 'Add at least one record'),
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

export type RecoveryRecord = z.infer<typeof RecoveryRecordSchema>

export type RecoveryFormValues = z.infer<typeof RecoveryFormSchema>
