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
	MultiSelectLabel,
	MultiSelectTrigger,
} from '@/components/ui/multi-select'
import type {
	MineralizationFormValues,
	MineralizationRecord,
} from '../schemas/mineralization-schema'

interface EditableTableMeta extends TableMeta<MineralizationRecord> {
	control: Control<MineralizationFormValues>
	onRemove: (index: number) => void
}

const mineralTypes = [
	{ value: 'pyrite', label: 'Pyrite' },
	{ value: 'magnetite', label: 'Magnetite' },
	{ value: 'calcite', label: 'Calcite' },
	{ value: 'chalcopyrite', label: 'Chalcopyrite' },
	{ value: 'sphalerite', label: 'Sphalerite' },
]

const mineralStyles = [
	{ value: 'disseminated', label: 'Disseminated' },
	{ value: 'nodules', label: 'Nodules' },
	{ value: 'veinlet', label: 'Veinlet' },
	{ value: 'stockwork', label: 'Stockwork' },
	{ value: 'massive', label: 'Massive' },
]

export const mineralizationColumns: ColumnDef<MineralizationRecord>[] = [
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
		accessorKey: 'minType',
		header: 'Min Type',
		cell: ({ row, table }) => {
			const rowIndex = row.index
			const { control } = table.options.meta as EditableTableMeta

			return (
				<Controller
					name={`records.${rowIndex}.minType`}
					control={control}
					render={({ field, fieldState }) => (
						<Field>
							<MultiSelect
								value={field.value}
								onValueChange={field.onChange}
							>
								<MultiSelectTrigger className="max-w-[100px]"placeholder="Select type" />
								<MultiSelectContent>
									<MultiSelectGroup>
										<MultiSelectLabel>Mineral Type</MultiSelectLabel>
										{mineralTypes.map((type) => (
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
		accessorKey: 'minAbunPerc',
		header: 'Min Abun (Perc)',
		cell: ({ row, table }) => {
			const rowIndex = row.index
			const { control } = table.options.meta as EditableTableMeta

			return (
				<Controller
					name={`records.${rowIndex}.minAbunPerc`}
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
		accessorKey: 'minStyle',
		header: 'Min Style',
		cell: ({ row, table }) => {
			const rowIndex = row.index
			const { control } = table.options.meta as EditableTableMeta

			return (
				<Controller
					name={`records.${rowIndex}.minStyle`}
					control={control}
					render={({ field, fieldState }) => (
						<Field>
							<MultiSelect
								value={field.value}
								onValueChange={field.onChange}
							>
								<MultiSelectTrigger className="max-w-[100px]"placeholder="Select style" />
								<MultiSelectContent>
									<MultiSelectGroup>
										<MultiSelectLabel>Mineral Style</MultiSelectLabel>
										{mineralStyles.map((style) => (
											<MultiSelectItem key={style.value} value={style.value}>
												{style.label}
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