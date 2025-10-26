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
// Removed Select imports as the CollarCoordinatesSection uses only Input
// but kept the styles available if Selects were to be added.
import { ChevronsUpDown, MapPin, Target } from 'lucide-react'
import { Controller, type UseFormReturn } from 'react-hook-form'
import type { DrillholeFormValues } from './schema'

interface SectionProps {
	form: UseFormReturn<DrillholeFormValues>
}

export default function CollarCoordinatesSection({ form }: SectionProps) {
	return (
		<Collapsible className="w-full mt-4" defaultOpen>
			<Card className="gap-2 py-3 shadow-none rounded-sm"> {/* Changed to rounded-sm */}
				<CardHeader className="flex-col items-center gap-0">
					<CollapsibleTrigger asChild>
						<div className="flex flex-row justify-between items-center w-full">
							{/* Added icon and font styling from DrillholeDetailsSection */}
							<div className="flex flex-row gap-2 items-center">
								<MapPin size={20} />
								<p className="text-lg font-medium font-lato"> {/* Added font-lato */}
									COLLAR COORDINATES
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
							{/* Easting */}
							<Controller
								name="collarCoordinates.easting"
								control={form.control}
								render={({ field, fieldState }) => (
									<Field data-invalid={fieldState.invalid}>
										<FieldLabel
											className="font-source-sans-pro text-base!" // Applied FieldLabel style
											htmlFor="collarCoordinates-easting"
										>
											Easting
										</FieldLabel>
										<Input
											{...field}
											className="font-source-sans-pro text-base! shadow-none py-5 bg-gray-200/30" // Applied Input style
											id={field.name}
											type="number"
											aria-invalid={fieldState.invalid}
											placeholder="Enter easting coordinate"
											onChange={(e) =>
												field.onChange(parseFloat(e.target.value))
											}
											value={field.value || ''}
										/>
										{fieldState.invalid && (
											<FieldError
												className="font-source-sans-pro" // Applied FieldError style
												errors={[fieldState.error]}
											/>
										)}
									</Field>
								)}
							/>

							{/* Northing */}
							<Controller
								name="collarCoordinates.northing"
								control={form.control}
								render={({ field, fieldState }) => (
									<Field data-invalid={fieldState.invalid}>
										<FieldLabel
											className="font-source-sans-pro text-base!" // Applied FieldLabel style
											htmlFor="collarCoordinates-northing"
										>
											Northing
										</FieldLabel>
										<Input
											{...field}
											className="font-source-sans-pro text-base! shadow-none py-5 bg-gray-200/30" // Applied Input style
											id={field.name}
											type="number"
											aria-invalid={fieldState.invalid}
											placeholder="Enter northing coordinate"
											onChange={(e) =>
												field.onChange(parseFloat(e.target.value))
											}
											value={field.value || ''}
										/>
										{fieldState.invalid && (
											<FieldError
												className="font-source-sans-pro" // Applied FieldError style
												errors={[fieldState.error]}
											/>
										)}
									</Field>
								)}
							/>

							{/* Elevation */}
							<Controller
								name="collarCoordinates.elevation"
								control={form.control}
								render={({ field, fieldState }) => (
									<Field data-invalid={fieldState.invalid}>
										<FieldLabel
											className="font-source-sans-pro text-base!" // Applied FieldLabel style
											htmlFor="collarCoordinates-elevation"
										>
											Elevation
										</FieldLabel>
										<Input
											{...field}
											className="font-source-sans-pro text-base! shadow-none py-5 bg-gray-200/30" // Applied Input style
											id={field.name}
											type="number"
											aria-invalid={fieldState.invalid}
											placeholder="Enter elevation"
											onChange={(e) =>
												field.onChange(parseFloat(e.target.value))
											}
											value={field.value || ''}
										/>
										{fieldState.invalid && (
											<FieldError
												className="font-source-sans-pro" // Applied FieldError style
												errors={[fieldState.error]}
											/>
										)}
									</Field>
								)}
							/>

							{/* Datum */}
							<Controller
								name="collarCoordinates.datum"
								control={form.control}
								render={({ field, fieldState }) => (
									<Field data-invalid={fieldState.invalid}>
										<FieldLabel
											className="font-source-sans-pro text-base!" // Applied FieldLabel style
											htmlFor="collarCoordinates-datum"
										>
											Datum
										</FieldLabel>
										<Input
											{...field}
											className="font-source-sans-pro text-base! shadow-none py-5 bg-gray-200/30" // Applied Input style
											id={field.name}
											aria-invalid={fieldState.invalid}
											placeholder="e.g., WGS84, NAD83, UTM Zone 30N"
											autoComplete="off"
										/>
										{fieldState.invalid && (
											<FieldError
												className="font-source-sans-pro" // Applied FieldError style
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