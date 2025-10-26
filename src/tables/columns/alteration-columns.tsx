import type { ColumnDef, TableMeta } from '@tanstack/react-table'
import { Trash } from 'lucide-react'
import { type Control, Controller } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Field, FieldError } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import {
	MultiSelect,
	MultiSelectContent,
	MultiSelectGroup,
	MultiSelectItem,
	MultiSelectTrigger,
} from '@/components/ui/multi-select'
import type {
	AlterationFormValues,
	AlterationRecord,
} from '../schemas/alteration-schema'

interface EditableTableMeta extends TableMeta<AlterationRecord> {
	control: Control<AlterationFormValues>
	onRemove: (index: number) => void
}

const alterationTypes = [
	{ value: 'chloritic', label: 'Chloritic' },
	{ value: 'sericitic', label: 'Sericitic' },
	{ value: 'argillic', label: 'Argillic' },
	{ value: 'propylitic', label: 'Propylitic' },
	{ value: 'potassic', label: 'Potassic' },
	{ value: 'silicic', label: 'Silicic' },
]

const alterationIntensities = [
	{ value: 'weak', label: 'Weak' },
	{ value: 'moderate', label: 'Moderate' },
	{ value: 'strong', label: 'Strong' },
	{ value: 'intense', label: 'Intense' },
]

export const alterationColumns: ColumnDef<AlterationRecord>[] = [
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
		accessorKey: 'alterationType',
		header: 'Alteration Type',
		cell: ({ row, table }) => {
			const rowIndex = row.index
			const { control } = table.options.meta as EditableTableMeta

			return (
				<Controller
					name={`records.${rowIndex}.alterationType`}
					control={control}
					render={({ field, fieldState }) => (
						<Field>
							<MultiSelect value={field.value} onValueChange={field.onChange}>
								<MultiSelectTrigger placeholder="Select type" />
								<MultiSelectContent>
									<MultiSelectGroup>
										{alterationTypes.map((type) => (
											<MultiSelectItem key={type.value} value={type.value}>
												{type.label}
											</MultiSelectItem>
										))}
									</MultiSelectGroup>
								</MultiSelectContent>
							</MultiSelect>
							{fieldState.error && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
				/>
			)
		},
	},
	{
		accessorKey: 'alterationIntensity',
		header: 'Alteration Intensity',
		cell: ({ row, table }) => {
			const rowIndex = row.index
			const { control } = table.options.meta as EditableTableMeta

			return (
				<Controller
					name={`records.${rowIndex}.alterationIntensity`}
					control={control}
					render={({ field, fieldState }) => (
						<Field>
							<MultiSelect value={field.value} onValueChange={field.onChange}>
								<MultiSelectTrigger placeholder="Select intensity..." />
								<MultiSelectContent>
									<MultiSelectGroup>
										{alterationIntensities.map((intensity) => (
											<MultiSelectItem
												key={intensity.value}
												value={intensity.value}
											>
												{intensity.label}
											</MultiSelectItem>
										))}
									</MultiSelectGroup>
								</MultiSelectContent>
							</MultiSelect>
							{fieldState.error && <FieldError errors={[fieldState.error]} />}
						</Field>
					)}
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
