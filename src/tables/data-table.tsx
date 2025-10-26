import { zodResolver } from '@hookform/resolvers/zod'
import {
	type ColumnDef,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from '@tanstack/react-table'
import { useFieldArray, useForm } from 'react-hook-form'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { formSchema, type Payment } from './columns'

interface FormValues {
	payments: Payment[]
}

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[]
	data: TData[] // Initial data
}

export function EditableDataTable<TData extends Payment, TValue>({
	columns,
	data,
}: DataTableProps<TData, TValue>) {
	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			payments: data,
		},
	})

	const { fields } = useFieldArray({
		control: form.control,
		name: 'payments',
	})

	const table = useReactTable({
		data: fields as TData[],
		columns: columns as ColumnDef<TData, TValue>[],
		getCoreRowModel: getCoreRowModel(),
		getRowId: (row) => row.id,
	})

	function onSubmit(formData: FormValues) {
		console.log('Form submitted with data:', formData.payments)
	}

	return (
		<form onSubmit={form.handleSubmit(onSubmit)}>
			{/* Table Rendering remains the same, but uses RHF's fields */}
			<div className="overflow-hidden rounded-md border">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext(),
													)}
										</TableHead>
									)
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row, index) => (
								<TableRow key={row.id}>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext(),
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-24 text-center"
								>
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
		</form>
	)
}
