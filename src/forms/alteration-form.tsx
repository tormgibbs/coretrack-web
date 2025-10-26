import { standardSchemaResolver } from '@hookform/resolvers/standard-schema'
import { useEffect } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { alterationColumns } from '@/tables/columns/alteration-columns'
import { EditableDataTable } from '@/tables/data-tables/editable-data-table'
import {
	AlterationFormSchema,
	type AlterationFormValues,
} from '@/tables/schemas/alteration-schema'
import { useTableForm } from '@/tables/table-form-context'

const defaultData = {
	records: [
		{
			depthFrom: 0,
			depthTo: 15,
			alterationType: ['chloritic'],
			alterationIntensity: ['moderate'],
		},
		{
			depthFrom: 15,
			depthTo: 30,
			alterationType: ['sericitic'],
			alterationIntensity: ['strong'],
		},
	],
}

function onSubmit(data: AlterationFormValues) {
	console.log('Submitted Data:', data.records)
}

function onError(errors: any) {
	console.log('Validation Errors:', errors)
}

export function AlterationForm() {
	const form = useForm<AlterationFormValues>({
		resolver: standardSchemaResolver(AlterationFormSchema),
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
					alterationType: [],
					alterationIntensity: [],
				}),
		})

		return () => unregisterFormActions()
	}, [registerFormActions, unregisterFormActions, form, append])

	return (
		<form>
			<EditableDataTable
				columns={alterationColumns}
				data={fields}
				control={form.control}
				onRemove={remove}
			/>
		</form>
	)
}
