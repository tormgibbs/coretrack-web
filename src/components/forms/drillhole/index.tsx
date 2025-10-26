import { standardSchemaResolver } from '@hookform/resolvers/standard-schema'
import { useForm } from 'react-hook-form'
import CollarCoordinatesSection from './collar-coordinates-section'
import CollarSurveySection from './collar-survey-section'
import CommentSection from './comment-section'
import CustomFieldsSection from './custom-fields-section'
import DrillholeDetailsSection from './drillhole-details-section'
import DrillingInfoSection from './drilling-info-section'
import { type DrillholeFormValues, drillholeFormSchema } from './schema'

export default function DrillholeForm() {
	const form = useForm<DrillholeFormValues>({
		resolver: standardSchemaResolver(drillholeFormSchema),
		defaultValues: {
			details: {},
			collarCoordinates: {},
			collarSurvey: {},
			comments: '',
			customFields: {},
			drillingInfo: {},
		},
	})

	// function onSubmit(data: z.infer<typeof formSchema>) {
	//    // Do something with the form values.
	//    console.log(data)
	//  }

	return (
		<form className="space-y-10">
			<DrillholeDetailsSection form={form} />
			<CollarCoordinatesSection form={form} />
			<CollarSurveySection form={form} />
			<DrillingInfoSection form={form} />
			<CommentSection form={form} />
			<CustomFieldsSection form={form} />
		</form>
	)
}
