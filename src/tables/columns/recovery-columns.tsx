import type { ColumnDef, TableMeta } from '@tanstack/react-table'
import { Trash } from 'lucide-react'
import { type Control, Controller, useWatch } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Field, FieldError } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import type {
	RecoveryFormValues,
	RecoveryRecord,
} from '../schemas/recovery-schema'

interface EditableTableMeta extends TableMeta<RecoveryRecord> {
	control: Control<RecoveryFormValues>
	onRemove: (index: number) => void
}

export const recoveryColumns: ColumnDef<RecoveryRecord>[] = [
	{
		accessorKey: 'depthFrom',
		header: 'Depth From',
		cell: ({ row, table }) => {
			const rowIndex = row.index
			const { control } = table.options.meta as EditableTableMeta

			return (
				<Controller
					name={`records.${rowIndex}.depthFrom`}
					control={control}
					render={({ field, fieldState }) => (
						<Field>
							<Input
								{...field}
								value={field.value ?? ''}
								type="number"
								className="w-full"
								aria-invalid={fieldState.invalid}
								onChange={(e) => {
									const value = e.target.value
									field.onChange(value === '' ? null : e.target.valueAsNumber)
								}}
							/>
							{fieldState.error && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>
			)
		},
	},
	{
		accessorKey: 'depthTo',
		header: 'Depth To',
		cell: ({ row, table }) => {
			const rowIndex = row.index
			const { control } = table.options.meta as EditableTableMeta
			return (
				<Controller
					name={`records.${rowIndex}.depthTo`}
					control={control}
					render={({ field, fieldState }) => (
						<Field>
							<Input
								{...field}
								value={field.value ?? ''}
								type="number"
								className="w-full"
								aria-invalid={fieldState.invalid}
								onChange={(e) => {
									const value = e.target.value
									field.onChange(value === '' ? null : e.target.valueAsNumber)
								}}
							/>
							{fieldState.error && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>
			)
		},
	},
	{
		accessorKey: 'totalRecLength',
		header: 'Total Rec Length (.m)',
		cell: ({ row, table }) => {
			const rowIndex = row.index
			const { control } = table.options.meta as EditableTableMeta

			return (
				<Controller
					name={`records.${rowIndex}.totalRecLength`}
					control={control}
					render={({ field, fieldState }) => (
						<Field>
							<Input
								{...field}
								value={field.value ?? ''}
								type="number"
								className="w-full"
								aria-invalid={fieldState.invalid}
								onChange={(e) => {
									const value = e.target.value
									field.onChange(value === '' ? null : e.target.valueAsNumber)
								}}
							/>
							{fieldState.error && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>
			)
		},
	},
	{
		accessorKey: 'recovery',
		header: 'Recovery (%)',
		cell: ({ row, table }) => {
			const rowIndex = row.index
			const { control } = table.options.meta as EditableTableMeta

			// Watch the current row's form values for reactive updates
			const depthFrom = useWatch({
				control,
				name: `records.${rowIndex}.depthFrom`,
			})
			const depthTo = useWatch({
				control,
				name: `records.${rowIndex}.depthTo`,
			})
			const totalRecLength = useWatch({
				control,
				name: `records.${rowIndex}.totalRecLength`,
			})

			const runLength = (depthTo ?? 0) - (depthFrom ?? 0)
			const recoveredLength = totalRecLength ?? 0

			if (runLength === 0) {
				return (
					<div className="text-center text-muted-foreground">
						{recoveredLength === 0 ? '0.00' : 'Error'}
					</div>
				)
			}

			const recoveryPercentage = (recoveredLength / runLength) * 100
			const formattedRecovery = recoveryPercentage.toFixed(2)

			return (
				<div className="flex justify-center font-medium">
					{formattedRecovery}%
				</div>
			)
		},
	},
	{
		accessorKey: 'action',
		header: () => <div className="text-center">Action</div>,
		cell: ({ row, table }) => {
			const rowIndex = row.index
			const { onRemove } = table.options.meta as EditableTableMeta
			return (
				<div className="flex justify-center">
					<Button
						type="button"
						variant="ghost"
						size="icon"
						onClick={() => onRemove(rowIndex)}
						className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
					>
						<Trash className="h-3.5 w-3.5" />
					</Button>
				</div>
			)
		},
	},
]
