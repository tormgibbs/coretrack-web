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
	SedimentologyFormValues,
	SedimentologyRecord,
} from '../schemas/sedimentology-schema'

interface EditableTableMeta extends TableMeta<SedimentologyRecord> {
	control: Control<SedimentologyFormValues>
	onRemove: (index: number) => void
}


const subUnitLithologyOptions = [
	{ value: 'qm(qm)', label: 'Qm (Qm)' },
	{ value: 'cgl(cgl)', label: 'CGL (CGL)' },
	{ value: 'sands', label: 'Sandstone' },
]

const packingOptions = [
	{ value: 'clast_supported', label: 'Clast Supported' },
	{ value: 'matrix_supported', label: 'Matrix Supported' },
	{ value: 'grain_supported', label: 'Grain Supported' },
]

const compositionOptions = [
	{ value: 'polymictic_conglomerate', label: 'Polymictic Conglomerate' },
	{ value: 'monomictic_sandstone', label: 'Monomictic Sandstone' },
]

const sortingOptions = [
	{ value: 'poorly_sorted', label: 'Poorly Sorted' },
	{ value: 'well_sorted', label: 'Well Sorted' },
	{ value: 'moderately_sorted', label: 'Moderately Sorted' },
]

const roundingOptions = [
	{ value: 'angular', label: 'Angular' },
	{ value: 'rounded', label: 'Rounded' },
	{ value: 'sub_rounded', label: 'Sub Rounded' },
]

const sphericityOptions = [
	{ value: 'low_sphericity', label: 'Low Sphericity' },
	{ value: 'high_sphericity', label: 'High Sphericity' },
]

const clastSizeOptions = [
	{ value: 'vsmall_pebble', label: 'Very Small Pebble - 4mm to 8mm' },
	{ value: 'medium_pebble', label: 'Medium Pebble - 16mm to 32mm' },
]

const matrixGrainSizeOptions = [
	{ value: 'coarse_grained_cg', label: 'Coarse Grained (CG)' },
	{ value: 'medium_grained_mg', label: 'Medium Grained (MG)' },
]

const matrixColourOptions = [
	{ value: 'grey', label: 'Grey' },
	{ value: 'red', label: 'Red' },
	{ value: 'yellow', label: 'Yellow' },
]

const packageMaturityOptions = [
	{ value: 'immature', label: 'Immature' },
	{ value: 'mature', label: 'Mature' },
	{ value: 'submature', label: 'Submature' },
]

const packageFiningOptions = [
	{ value: 'downward_fining', label: 'Downward Fining' },
	{ value: 'upward_fining', label: 'Upward Fining' },
]


const SelectCell = ({
	rowIndex,
	control,
	name,
	placeholder,
	options,
}: {
	rowIndex: number
	control: Control<SedimentologyFormValues>
	name: keyof SedimentologyRecord
	placeholder: string
	options: { value: string; label: string }[]
}) => (
	<Controller
		name={`records.${rowIndex}.${name}` as const}
		control={control}
		render={({ field, fieldState }) => (
			<Field>
				<Select value={field.value ?? ''} onValueChange={field.onChange}>
					<SelectTrigger className="w-full">
						<SelectValue placeholder={placeholder}>
							{field.value &&
								options.find((opt) => opt.value === field.value)?.label}
						</SelectValue>
					</SelectTrigger>
					<SelectContent>
						{options.map((option) => (
							<SelectItem key={option.value} value={option.value}>
								{option.label}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
				{fieldState.error && <FieldError errors={[fieldState.error]} />}
			</Field>
		)}
	/>
)


const NumberInputCell = ({
	rowIndex,
	control,
	name,
}: {
	rowIndex: number
	control: Control<SedimentologyFormValues>
	name: keyof SedimentologyRecord
}) => (
	<Controller
		name={`records.${rowIndex}.${name}` as const}
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


export const sedimentologyColumns: ColumnDef<SedimentologyRecord>[] = [
	{
		accessorKey: 'depthFrom',
		header: 'Depth From',
		cell: ({ row, table }) =>
			NumberInputCell({
				rowIndex: row.index,
				control: (table.options.meta as EditableTableMeta).control,
				name: 'depthFrom',
			}),
	},
	{
		accessorKey: 'depthTo',
		header: 'Depth To',
		cell: ({ row, table }) =>
			NumberInputCell({
				rowIndex: row.index,
				control: (table.options.meta as EditableTableMeta).control,
				name: 'depthTo',
			}),
	},
	{
		accessorKey: 'subUnitLithology',
		header: 'Sub Unit Lithology',
		cell: ({ row, table }) =>
			SelectCell({
				rowIndex: row.index,
				control: (table.options.meta as EditableTableMeta).control,
				name: 'subUnitLithology',
				placeholder: 'Select lithology',
				options: subUnitLithologyOptions,
			}),
	},
	{
		accessorKey: 'clastPacking',
		header: 'Clast Packing',
		cell: ({ row, table }) =>
			SelectCell({
				rowIndex: row.index,
				control: (table.options.meta as EditableTableMeta).control,
				name: 'clastPacking',
				placeholder: 'Select packing',
				options: packingOptions,
			}),
	},
	{
		accessorKey: 'composition',
		header: 'Composition',
		cell: ({ row, table }) =>
			SelectCell({
				rowIndex: row.index,
				control: (table.options.meta as EditableTableMeta).control,
				name: 'composition',
				placeholder: 'Select composition',
				options: compositionOptions,
			}),
	},
	{
		accessorKey: 'clastSorting',
		header: 'Clast Sorting',
		cell: ({ row, table }) =>
			SelectCell({
				rowIndex: row.index,
				control: (table.options.meta as EditableTableMeta).control,
				name: 'clastSorting',
				placeholder: 'Select sorting',
				options: sortingOptions,
			}),
	},
	{
		accessorKey: 'clastRounding',
		header: 'Clast Rounding',
		cell: ({ row, table }) =>
			SelectCell({
				rowIndex: row.index,
				control: (table.options.meta as EditableTableMeta).control,
				name: 'clastRounding',
				placeholder: 'Select rounding',
				options: roundingOptions,
			}),
	},
	{
		accessorKey: 'clastSphericity',
		header: 'Clast Sphericity',
		cell: ({ row, table }) =>
			SelectCell({
				rowIndex: row.index,
				control: (table.options.meta as EditableTableMeta).control,
				name: 'clastSphericity',
				placeholder: 'Select sphericity',
				options: sphericityOptions,
			}),
	},
	{
		accessorKey: 'clastSize',
		header: 'Clast Size',
		cell: ({ row, table }) =>
			SelectCell({
				rowIndex: row.index,
				control: (table.options.meta as EditableTableMeta).control,
				name: 'clastSize',
				placeholder: 'Select clast size',
				options: clastSizeOptions,
			}),
	},
	{
		accessorKey: 'averagePebbleSize',
		header: 'Average Pebble Size',
		cell: ({ row, table }) =>
			NumberInputCell({
				rowIndex: row.index,
				control: (table.options.meta as EditableTableMeta).control,
				name: 'averagePebbleSize',
			}),
	},
	{
		accessorKey: 'matrixGrainSize',
		header: 'Matrix Grain Size',
		cell: ({ row, table }) =>
			SelectCell({
				rowIndex: row.index,
				control: (table.options.meta as EditableTableMeta).control,
				name: 'matrixGrainSize',
				placeholder: 'Select grain size',
				options: matrixGrainSizeOptions,
			}),
	},
	{
		accessorKey: 'matrixColour',
		header: 'Matrix Colour',
		cell: ({ row, table }) =>
			SelectCell({
				rowIndex: row.index,
				control: (table.options.meta as EditableTableMeta).control,
				name: 'matrixColour',
				placeholder: 'Select colour',
				options: matrixColourOptions,
			}),
	},
	{
		accessorKey: 'packageMaturity',
		header: 'Package Maturity',
		cell: ({ row, table }) =>
			SelectCell({
				rowIndex: row.index,
				control: (table.options.meta as EditableTableMeta).control,
				name: 'packageMaturity',
				placeholder: 'Select maturity',
				options: packageMaturityOptions,
			}),
	},
	{
		accessorKey: 'packageFining',
		header: 'Package Fining',
		cell: ({ row, table }) =>
			SelectCell({
				rowIndex: row.index,
				control: (table.options.meta as EditableTableMeta).control,
				name: 'packageFining',
				placeholder: 'Select fining',
				options: packageFiningOptions,
			}),
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
