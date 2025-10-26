import { standardSchemaResolver } from '@hookform/resolvers/standard-schema'
import { useEffect } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { sedimentologyColumns } from '@/tables/columns/sedimentology-columns'
import { EditableDataTable } from '@/tables/data-tables/editable-data-table'
import {
	SedimentologyFormSchema,
	type SedimentologyFormValues,
} from '@/tables/schemas/sedimentology-schema'
import { useTableForm } from '@/tables/table-form-context'

const defaultData = {
	records: [
		{
			depthFrom: 383.3,
			depthTo: 391.67,
			subUnitLithology: 'qm(qm)',
			clastPacking: 'pebbly_quartzite',
			composition: 'polymictic_conglomerate',
			clastSorting: 'poorly_sorted',
			clastRounding: 'angular',
			clastSphericity: 'low_sphericity',
			clastSize: 'vsmall_pebble',
			averagePebbleSize: 4,
			matrixGrainSize: 'coarse_grained_cg',
			matrixColour: 'grey',
			packageMaturity: 'immature',
			packageFining: 'downward_fining',
		},
		{
			depthFrom: 391.67,
			depthTo: 400.0,
			subUnitLithology: 'cgl(cgl)',
			clastPacking: 'matrix_supported',
			composition: 'polymictic_conglomerate',
			clastSorting: 'well_sorted',
			clastRounding: 'round',
			clastSphericity: 'high_sphericity',
			clastSize: 'medium_pebble',
			averagePebbleSize: 20,
			matrixGrainSize: 'coarse_grained_cg',
			matrixColour: 'grey',
			packageMaturity: 'mature',
			packageFining: 'upward_fining',
		},
	],
}

function onSubmit(data: SedimentologyFormValues) {
	console.log('Submitted Sedimentology Data:', data.records)
}

function onError(errors: any) {
	console.log('Sedimentology Validation Errors:', errors)
}

export function SedimentologyForm() {
	const form = useForm<SedimentologyFormValues>({
		resolver: standardSchemaResolver(SedimentologyFormSchema),
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
					subUnitLithology: undefined,
					clastPacking: undefined,
					composition: undefined,
					clastSorting: undefined,
					clastRounding: undefined,
					clastSphericity: undefined,
					clastSize: undefined,
					averagePebbleSize: undefined,
					matrixGrainSize: undefined,
					matrixColour: undefined,
					packageMaturity: undefined,
					packageFining: undefined,
				}),
		})

		return () => unregisterFormActions()
	}, [registerFormActions, unregisterFormActions, form, append])

	return (
		<form>
			<EditableDataTable
				columns={sedimentologyColumns}
				data={fields}
				control={form.control}
				onRemove={remove}
			/>
		</form>
	)
}
