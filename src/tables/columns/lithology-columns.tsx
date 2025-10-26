import type { ColumnDef, TableMeta } from '@tanstack/react-table'
import { Trash } from 'lucide-react'
import { type Control, Controller } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Field, FieldError } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import type {
	LithologyFormValues,
	LithologyRecord,
} from '../schemas/lithology-schema'

interface EditableTableMeta extends TableMeta<LithologyRecord> {
	control: Control<LithologyFormValues>
	onRemove: (index: number) => void
}

const rockTypes = [
	{ value: 'sandstone', label: 'Sandstone', color: '#F4A460' },
	{ value: 'limestone', label: 'Limestone', color: '#D3D3D3' },
	{ value: 'shale', label: 'Shale', color: '#696969' },
	{ value: 'granite', label: 'Granite', color: '#C0C0C0' },
	{ value: 'basalt', label: 'Basalt', color: '#36454F' },
	{ value: 'coal', label: 'Coal', color: '#1C1C1C' },
]

export const lithologyColumns: ColumnDef<LithologyRecord>[] = [
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
		accessorKey: 'rockType',
		header: 'Rock Type',
		cell: ({ row, table }) => {
			const rowIndex = row.index
			const { control } = table.options.meta as EditableTableMeta

			return (
				<Controller
					name={`records.${rowIndex}.rockType`}
					control={control}
					render={({ field, fieldState }) => (
						<Field>
							<Select value={field.value ?? ''} onValueChange={field.onChange}>
								<SelectTrigger className="w-full">
									<SelectValue placeholder="Select rock type">
										{field.value &&
											rockTypes.find((rt) => rt.value === field.value)?.label}
									</SelectValue>
								</SelectTrigger>
								<SelectContent>
									{rockTypes.map((rockType) => (
										<SelectItem key={rockType.value} value={rockType.value}>
											<div className="flex items-center gap-2">
												<div
													className="h-4 w-4 rounded border border-border"
													style={{ backgroundColor: rockType.color }}
												/>
												<span>{rockType.label}</span>
											</div>
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							{fieldState.error && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>
			)
		},
	},
	{
		accessorKey: 'colour',
		header: () => <div className="text-center">Colour</div>,
		cell: ({ row, table }) => {
			const rowIndex = row.index
			const { control } = table.options.meta as EditableTableMeta

			return (
				<Controller
					name={`records.${rowIndex}.rockType`}
					control={control}
					render={({ field }) => {
						const selectedRock = rockTypes.find(
							(rt) => rt.value === field.value,
						)

						if (!selectedRock) {
							return (
								<div className="flex flex-1 items-center justify-center h-9 text-sm text-muted-foreground">
									-
								</div>
							)
						}

						return (
							<div className="flex justify-center">
								<div
									className="w-full h-9 rounded"
									style={{ backgroundColor: selectedRock.color }}
								/>
							</div>
						)
					}}
				/>
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
