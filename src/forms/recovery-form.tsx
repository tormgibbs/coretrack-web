import { standardSchemaResolver } from '@hookform/resolvers/standard-schema'
import { useEffect } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { recoveryColumns } from '@/tables/columns/recovery-columns'
import { EditableDataTable } from '@/tables/data-tables/editable-data-table'
import {
	RecoveryFormSchema,
	type RecoveryFormValues,
} from '@/tables/schemas/recovery-schema'
import { useTableForm } from '@/tables/table-form-context'

const defaultData = {
	records: [
		{
			depthFrom: 0,
			depthTo: 359.0,
			totalRecLength: 0.0,
		},
		{
			depthFrom: 359.0,
			depthTo: 360.0,
			totalRecLength: 1.0,
		},
	],
}

function onSubmit(data: RecoveryFormValues) {
	console.log('Submitted Recovery Data:', data.records)
}

function onError(errors: any) {
	console.log('Recovery Validation Errors:', errors)
}

export function RecoveryForm() {
	const form = useForm<RecoveryFormValues>({
		resolver: standardSchemaResolver(RecoveryFormSchema),
		defaultValues: defaultData,
	})

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: 'records',
	})

	const { registerFormActions, unregisterFormActions } = useTableForm()

	useEffect(() => {
		registerFormActions({
			onSave: form.handleSubmit(onSubmit, onError),
			onAddRow: () =>
				append({
					depthFrom: 0,
					depthTo: 0,
					totalRecLength: 0,
				}),
		})

		return () => unregisterFormActions()
	}, [registerFormActions, unregisterFormActions, form, append])

	return (
		<form>
			<EditableDataTable
				columns={recoveryColumns}
				data={fields}
				control={form.control}
				onRemove={remove}
			/>
		</form>
	)
}
