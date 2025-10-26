import { z } from 'zod'

export const SedimentologyRecordSchema = z
	.object({
		depthFrom: z.coerce.number().min(0, 'Must be non-negative'),
		depthTo: z.coerce.number().min(0, 'Must be non-negative'),

		subUnitLithology: z.string().optional(),
		clastPacking: z.string().optional(),
		composition: z.string().optional(),
		clastSorting: z.string().optional(),
		clastRounding: z.string().optional(),
		clastSphericity: z.string().optional(),
		clastSize: z.string().optional(),
		averagePebbleSize: z.coerce.number().optional(),
		matrixGrainSize: z.string().optional(),
		matrixColour: z.string().optional(),
		packageMaturity: z.string().optional(),
		packageFining: z.string().optional(),
	})
	.refine((data) => data.depthTo > data.depthFrom, {
		message: 'Depth To must be greater than Depth From',
		path: ['depthTo'],
	})

export const SedimentologyFormSchema = z
	.object({
		records: z
			.array(SedimentologyRecordSchema)
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

export type SedimentologyRecord = z.infer<typeof SedimentologyRecordSchema>

export type SedimentologyFormValues = z.infer<typeof SedimentologyFormSchema>
