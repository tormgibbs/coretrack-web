import type { ColumnDef } from '@tanstack/react-table'
import { Controller } from 'react-hook-form'
import * as z from 'zod'
import { Input } from '@/components/ui/input'

export const editablePaymentSchema = z.object({
	id: z.string(),
	amount: z.number().min(0.01, 'Amount must be greater than 0.'),
	status: z.enum(['pending', 'processing', 'success', 'failed']),
	email: z.email('Invalid email address.'),
})

export const formSchema = z.object({
	payments: z.array(editablePaymentSchema),
})

export const columns: ColumnDef<Payment>[] = [
	{
		accessorKey: 'status',
		header: 'Status',
	},
	{
		accessorKey: 'email',
		header: 'Email',
		cell: ({ row, table }) => {
			const rowIndex = row.index // Get the index for the field array path
			// Get the RHF control object from the table's state
			const { control } = (table.options.meta as any) || {}

			if (!control) return row.getValue('email') // Fallback for non-editable mode

			return (
				<Controller
					name={`payments.${rowIndex}.email`} // RHF path: payments[index].email
					control={control}
					render={({ field, fieldState }) => (
						<div>
							<Input
								{...field}
								type="email"
								placeholder="email@example.com"
								aria-invalid={fieldState.invalid}
							/>
							{fieldState.error && (
								<p className="text-xs text-red-500 mt-1">
									{fieldState.error.message}
								</p>
							)}
						</div>
					)}
				/>
			)
		},
	},
	{
		accessorKey: 'amount',
		header: 'Amount',
		cell: ({ row, table }) => {
			const rowIndex = row.index
			const { control } = (table.options.meta as any) || {}

			const amount = parseFloat(row.getValue('amount'))
			const formatted = new Intl.NumberFormat('en-US', {
				style: 'currency',
				currency: 'USD',
			}).format(amount)

			if (!control)
				return <div className="text-right font-medium">{formatted}</div>

			return (
				<Controller
					name={`payments.${rowIndex}.amount`}
					control={control}
					render={({ field, fieldState }) => (
						<div className="text-right">
							<Input
								// Convert number to string for input value
								value={field.value.toString()}
								onChange={(e) => field.onChange(parseFloat(e.target.value))}
								type="number"
								step="0.01"
								placeholder="0.00"
								className="text-right"
								aria-invalid={fieldState.invalid}
							/>
							{fieldState.error && (
								<p className="text-xs text-red-500 mt-1">
									{fieldState.error.message}
								</p>
							)}
						</div>
					)}
				/>
			)
		},
	},
]

export type Payment = z.infer<typeof editablePaymentSchema>
