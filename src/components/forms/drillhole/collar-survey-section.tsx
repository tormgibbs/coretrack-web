import { Button } from '@renderer/components/ui/button'
import { Card, CardContent, CardHeader } from '@renderer/components/ui/card'
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from '@renderer/components/ui/collapsible'
import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
} from '@renderer/components/ui/field'
import { Input } from '@renderer/components/ui/input'
import { ChevronsUpDown, Ruler, Target } from 'lucide-react'
import { Controller, type UseFormReturn } from 'react-hook-form'
import type { DrillholeFormValues } from './schema'

interface SectionProps {
	form: UseFormReturn<DrillholeFormValues>
}

export default function CollarSurveySection({ form }: SectionProps) {
	return (
		<Collapsible className="w-full mt-4" defaultOpen>
			<Card className="gap-2 py-3 shadow-none rounded-sm">
				<CardHeader className="flex-col items-center gap-0">
					<CollapsibleTrigger asChild>
						<div className="flex flex-row justify-between items-center w-full">
							<div className="flex flex-row gap-2 items-center">
								<Ruler size={20} />
								<p className="text-lg font-medium font-lato">
									COLLAR SURVEY
								</p>
							</div>
							<Button variant="ghost" size="icon" className="size-8">
								<ChevronsUpDown />
								<span className="sr-only">Toggle</span>
							</Button>
						</div>
					</CollapsibleTrigger>
				</CardHeader>
				<CollapsibleContent>
					<CardContent className="py-4">
						<FieldGroup className="grid grid-cols-1 sm:grid-cols-2 gap-6">
							{/* Dip */}
							<Controller
								name="collarSurvey.dip"
								control={form.control}
								render={({ field, fieldState }) => (
									<Field data-invalid={fieldState.invalid}>
										<FieldLabel
											className="font-source-sans-pro text-base!"
											htmlFor="collarSurvey-dip"
										>
											Dip
										</FieldLabel>
										<Input
											{...field}
											className="font-source-sans-pro text-base! shadow-none py-5 bg-gray-200/30"
											id={field.name}
											type="number"
											aria-invalid={fieldState.invalid}
											placeholder="Enter dip (-90 to 90)"
											onChange={(e) =>
												field.onChange(parseFloat(e.target.value))
											}
											value={field.value || ''}
										/>
										{fieldState.invalid && (
											<FieldError
												className="font-source-sans-pro"
												errors={[fieldState.error]}
											/>
										)}
									</Field>
								)}
							/>

							{/* Azimuth */}
							<Controller
								name="collarSurvey.azimuth"
								control={form.control}
								render={({ field, fieldState }) => (
									<Field data-invalid={fieldState.invalid}>
										<FieldLabel
											className="font-source-sans-pro text-base!"
											htmlFor="collarSurvey-azimuth"
										>
											Azimuth
										</FieldLabel>
										<Input
											{...field}
											className="font-source-sans-pro text-base! shadow-none py-5 bg-gray-200/30"
											id={field.name}
											type="number"
											aria-invalid={fieldState.invalid}
											placeholder="Enter azimuth (0 to 360)"
											onChange={(e) =>
												field.onChange(parseFloat(e.target.value))
											}
											value={field.value || ''}
										/>
										{fieldState.invalid && (
											<FieldError
												className="font-source-sans-pro"
												errors={[fieldState.error]}
											/>
										)}
									</Field>
								)}
							/>

							{/* Survey Method */}
							<Controller
								name="collarSurvey.surveyMethod"
								control={form.control}
								render={({ field, fieldState }) => (
									<Field data-invalid={fieldState.invalid}>
										<FieldLabel
											className="font-source-sans-pro text-base!"
											htmlFor="collarSurvey-surveyMethod"
										>
											Survey Method
										</FieldLabel>
										<Input
											{...field}
											className="font-source-sans-pro text-base! shadow-none py-5 bg-gray-200/30"
											id={field.name}
											aria-invalid={fieldState.invalid}
											placeholder="e.g., Compass and Clinometer"
											autoComplete="off"
										/>
										{fieldState.invalid && (
											<FieldError
												className="font-source-sans-pro"
												errors={[fieldState.error]}
											/>
										)}
									</Field>
								)}
							/>
						</FieldGroup>
					</CardContent>
				</CollapsibleContent>
			</Card>
		</Collapsible>
	)
}