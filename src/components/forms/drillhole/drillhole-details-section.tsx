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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@renderer/components/ui/select'
import { ChevronsUpDown, Target } from 'lucide-react'
import { Controller, type UseFormReturn } from 'react-hook-form'
import type { DrillholeFormValues } from './schema'

interface SectionProps {
	form: UseFormReturn<DrillholeFormValues>
}

export default function DrillholeDetailsSection({ form }: SectionProps) {
	return (
		<Collapsible className="w-full mt-4" defaultOpen>
			<Card className="gap-2 py-3 shadow-none rounded-sm">
				<CardHeader className="flex-col items-center gap-0 ">
					<CollapsibleTrigger asChild>
						<div className="flex flex-row justify-between items-center w-full">
							<div className="flex flex-row gap-2 items-center">
								<Target size={20} />
								<p className="text-lg font-medium font-lato">
									DRILL HOLE DETAILS
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
						<FieldGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
							{/* Hole Type (Original Styled Field) */}
							<Controller
								name="details.holeType"
								control={form.control}
								render={({ field, fieldState }) => (
									<Field data-invalid={fieldState.invalid}>
										<FieldLabel
											className="font-source-sans-pro text-base!"
											htmlFor={field.name}
										>
											Hole Type
										</FieldLabel>
										<Select
											name={field.name}
											value={field.value}
											onValueChange={field.onChange}
										>
											<SelectTrigger
												className="font-source-sans-pro text-base! shadow-none py-5 bg-gray-200/30"
												id={field.name}
												aria-invalid={fieldState.invalid}
											>
												<SelectValue placeholder="Select hole type" />
											</SelectTrigger>
											<SelectContent className="font-source-sans-pro shadow-none [&_[role=option]]:hover:bg-[#BF9636]">
												<SelectItem value="DD">
													DD (Diamond Drilling)
												</SelectItem>
												<SelectItem value="RC">
													RC (Reverse Circulation)
												</SelectItem>
												<SelectItem value="RAC">
													RAC (Rotary Air Circulation)
												</SelectItem>
											</SelectContent>
										</Select>
										{fieldState.invalid && (
											<FieldError
												className="font-source-sans-pro"
												errors={[fieldState.error]}
											/>
										)}
									</Field>
								)}
							/>

							{/* Hole Size (Styled) */}
							<Controller
								name="details.holeSize"
								control={form.control}
								render={({ field, fieldState }) => (
									<Field data-invalid={fieldState.invalid}>
										<FieldLabel
											className="font-source-sans-pro text-base!"
											htmlFor={field.name}
										>
											Hole Size
										</FieldLabel>
										<Select
											name={field.name}
											value={field.value}
											onValueChange={field.onChange}
										>
											<SelectTrigger
												className="font-source-sans-pro text-base! shadow-none py-5 bg-gray-200/30"
												id={field.name}
												aria-invalid={fieldState.invalid}
											>
												<SelectValue placeholder="Select hole size" />
											</SelectTrigger>
											<SelectContent className="font-source-sans-pro shadow-none [&_[role=option]]:hover:bg-[#BF9636]">
												<SelectItem value="NQ">NQ (75.7mm)</SelectItem>
												<SelectItem value="HQ">HQ (96.0mm)</SelectItem>
												<SelectItem value="PQ">PQ (122.6mm)</SelectItem>
											</SelectContent>
										</Select>
										{fieldState.invalid && (
											<FieldError
												className="font-source-sans-pro"
												errors={[fieldState.error]}
											/>
										)}
									</Field>
								)}
							/>

							{/* Location (Styled) */}
							<Controller
								name="details.location"
								control={form.control}
								render={({ field, fieldState }) => (
									<Field data-invalid={fieldState.invalid}>
										<FieldLabel
											className="font-source-sans-pro text-base!"
											htmlFor={field.name}
										>
											Location
										</FieldLabel>
										<Input
											{...field}
											className="font-source-sans-pro text-base! shadow-none py-5 bg-gray-200/30"
											id={field.name}
											aria-invalid={fieldState.invalid}
											placeholder="Enter location"
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

							{/* Unit of Measure (Styled) */}
							<Controller
								name="details.unitOfMeasure"
								control={form.control}
								render={({ field, fieldState }) => (
									<Field data-invalid={fieldState.invalid}>
										<FieldLabel
											className="font-source-sans-pro text-base!"
											htmlFor={field.name}
										>
											Unit of Measure
										</FieldLabel>
										<Select
											name={field.name}
											value={field.value}
											onValueChange={field.onChange}
										>
											<SelectTrigger
												className="font-source-sans-pro text-base! shadow-none py-5 bg-gray-200/30"
												id={field.name}
												aria-invalid={fieldState.invalid}
											>
												<SelectValue placeholder="Select unit" />
											</SelectTrigger>
											<SelectContent className="font-source-sans-pro shadow-none [&_[role=option]]:hover:bg-[#BF9636]">
												<SelectItem value="meters">Meters</SelectItem>
												<SelectItem value="feet">Feet</SelectItem>
											</SelectContent>
										</Select>
										{fieldState.invalid && (
											<FieldError
												className="font-source-sans-pro"
												errors={[fieldState.error]}
											/>
										)}
									</Field>
								)}
							/>

							{/* Unit of Degree (Styled) */}
							<Controller
								name="details.unitOfDegree"
								control={form.control}
								render={({ field, fieldState }) => (
									<Field data-invalid={fieldState.invalid}>
										<FieldLabel
											className="font-source-sans-pro text-base!"
											htmlFor={field.name}
										>
											Unit of Degree
										</FieldLabel>
										<Select
											name={field.name}
											value={field.value}
											onValueChange={field.onChange}
										>
											<SelectTrigger
												className="font-source-sans-pro text-base! shadow-none py-5 bg-gray-200/30"
												id={field.name}
												aria-invalid={fieldState.invalid}
											>
												<SelectValue placeholder="Select unit" />
											</SelectTrigger>
											<SelectContent className="font-source-sans-pro shadow-none [&_[role=option]]:hover:bg-[#BF9636]">
												<SelectItem value="degrees">Degrees</SelectItem>
												<SelectItem value="gradians">Gradians</SelectItem>
											</SelectContent>
										</Select>
										{fieldState.invalid && (
											<FieldError
												className="font-source-sans-pro"
												errors={[fieldState.error]}
											/>
										)}
									</Field>
								)}
							/>

							{/* Maximum Depth (Styled) */}
							<Controller
								name="details.maximumDepth"
								control={form.control}
								render={({ field, fieldState }) => (
									<Field data-invalid={fieldState.invalid}>
										<FieldLabel
											className="font-source-sans-pro text-base!"
											htmlFor={field.name}
										>
											Maximum Depth
										</FieldLabel>
										<Input
											{...field}
											className="font-source-sans-pro text-base! shadow-none py-5 bg-gray-200/30"
											id={field.name}
											type="number"
											aria-invalid={fieldState.invalid}
											placeholder="Enter maximum depth"
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
						</FieldGroup>
					</CardContent>
				</CollapsibleContent>
			</Card>
		</Collapsible>
	)
}
