import { standardSchemaResolver } from '@hookform/resolvers/standard-schema'
import { useEffect } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { mineralizationColumns } from '@/tables/columns/mineralization-columns'
import { EditableDataTable } from '@/tables/data-tables/editable-data-table'
import {
	MineralizationFormSchema,
	type MineralizationFormValues,
} from '@/tables/schemas/mineralization-schema'
import { useTableForm } from '@/tables/table-form-context'

const defaultData = {
	records: [
		{
			depthFrom: 326.6,
			depthTo: 326.6,
			minType: ['pyrite'],
			minAbunPerc: 10,
			minStyle: ['disseminated'],
		},
		{
			depthFrom: 326.6,
			depthTo: 329.45,
			minType: ['pyrite'],
			minAbunPerc: 0,
			minStyle: ['disseminated'],
		},
	],
}

function onSubmit(data: MineralizationFormValues) {
	console.log('Submitted Mineralization Data:', data.records)
}

function onError(errors: any) {
	console.log('Mineralization Validation Errors:', errors)
}

export function MineralizationForm() {
	const form = useForm<MineralizationFormValues>({
		resolver: standardSchemaResolver(MineralizationFormSchema),
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
					minType: [],
					minAbunPerc: 0,
					minStyle: [],
				}),
		})

		return () => unregisterFormActions()
	}, [registerFormActions, unregisterFormActions, form, append])

	return (
		<form>
			<EditableDataTable
				columns={mineralizationColumns}
				data={fields}
				control={form.control}
				onRemove={remove}
			/>
		</form>
	)
}
