import { standardSchemaResolver } from '@hookform/resolvers/standard-schema'
import { useEffect } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { lithologyColumns } from '@/tables/columns/lithology-columns'
import { EditableDataTable } from '@/tables/data-tables/editable-data-table'
import {
	LithologyFormSchema,
	type LithologyFormValues,
} from '@/tables/schemas/lithology-schema'
import { useTableForm } from '@/tables/table-form-context'

const defaultData = {
	records: [
		{ depthFrom: 0, depthTo: 10, rockType: 'Sandstone' },
		{ depthFrom: 10, depthTo: 25, rockType: 'Shale' },
	],
}

function onSubmit(data: LithologyFormValues) {
	console.log('Submitted Data:', data.records)
}

function onError(errors: any) {
	console.log('Validation Errors:', errors)
}

export function LithologyForm() {
	const form = useForm<LithologyFormValues>({
		resolver: standardSchemaResolver(LithologyFormSchema),
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
			onAddRow: () => append({ depthFrom: 0, depthTo: 0, rockType: '' }),
		})

		return () => unregisterFormActions()
	}, [registerFormActions, unregisterFormActions, form, append])

	return (
		<form>
			<EditableDataTable
				columns={lithologyColumns}
				data={fields}
				control={form.control}
				onRemove={remove}
			/>
		</form>
	)
}
