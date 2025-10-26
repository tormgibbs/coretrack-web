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
import { ChevronsUpDown, Settings2, Target } from 'lucide-react'
import { Controller, type UseFormReturn } from 'react-hook-form'
import type { DrillholeFormValues } from './schema'

interface SectionProps {
	form: UseFormReturn<DrillholeFormValues>
}

export default function CustomFieldsSection({ form }: SectionProps) {
	return (
		<Collapsible className="w-full mt-4" defaultOpen>
			<Card className="gap-2 py-3 shadow-none rounded-sm">
				<CardHeader className="flex-col items-center gap-0">
					<CollapsibleTrigger asChild>
						<div className="flex flex-row justify-between items-center w-full">
							<div className="flex flex-row gap-2 items-center">
								<Settings2 size={20} />
								<p className="text-lg font-medium font-lato">CUSTOM FIELDS</p>
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
							{/* Drill Purpose */}
							<Controller
								name="customFields.drillPurpose"
								control={form.control}
								render={({ field, fieldState }) => (
									<Field data-invalid={fieldState.invalid}>
										<FieldLabel
											className="font-source-sans-pro text-base!"
											htmlFor="customFields-drillPurpose"
										>
											Drill Purpose
										</FieldLabel>
										<Input
											{...field}
											className="font-source-sans-pro text-base! shadow-none py-5 bg-gray-200/30"
											id={field.name}
											aria-invalid={fieldState.invalid}
											placeholder="e.g., Resource Definition, Exploration"
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

							{/* Drilled From */}
							<Controller
								name="customFields.drilledFrom"
								control={form.control}
								render={({ field, fieldState }) => (
									<Field data-invalid={fieldState.invalid}>
										<FieldLabel
											className="font-source-sans-pro text-base!"
											htmlFor="customFields-drilledFrom"
										>
											Drilled From
										</FieldLabel>
										<Input
											{...field}
											className="font-source-sans-pro text-base! shadow-none py-5 bg-gray-200/30"
											id={field.name}
											aria-invalid={fieldState.invalid}
											placeholder="e.g., Underground, Surface"
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

							{/* Domain Code */}
							<Controller
								name="customFields.domainCode"
								control={form.control}
								render={({ field, fieldState }) => (
									<Field data-invalid={fieldState.invalid}>
										<FieldLabel
											className="font-source-sans-pro text-base!"
											htmlFor="customFields-domainCode"
										>
											Domain Code
										</FieldLabel>
										<Input
											{...field}
											className="font-source-sans-pro text-base! shadow-none py-5 bg-gray-200/30"
											id={field.name}
											aria-invalid={fieldState.invalid}
											placeholder="e.g., A1, B2"
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

							{/* Sub-Level */}
							<Controller
								name="customFields.subLevel"
								control={form.control}
								render={({ field, fieldState }) => (
									<Field data-invalid={fieldState.invalid}>
										<FieldLabel
											className="font-source-sans-pro text-base!"
											htmlFor="customFields-subLevel"
										>
											Sub-Level
										</FieldLabel>
										<Input
											{...field}
											className="font-source-sans-pro text-base! shadow-none py-5 bg-gray-200/30"
											id={field.name}
											aria-invalid={fieldState.invalid}
											placeholder="e.g., 1000mRL"
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

							{/* Hole Status */}
							<Controller
								name="customFields.holeStatus"
								control={form.control}
								render={({ field, fieldState }) => (
									<Field data-invalid={fieldState.invalid}>
										<FieldLabel
											className="font-source-sans-pro text-base!"
											htmlFor="customFields-holeStatus"
										>
											Hole Status
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
												<SelectValue placeholder="Select status" />
											</SelectTrigger>
											<SelectContent className="font-source-sans-pro shadow-none [&_[role=option]]:hover:bg-[#BF9636]">
												<SelectItem value="Pending">Pending</SelectItem>
												<SelectItem value="Active">Active</SelectItem>
												<SelectItem value="Completed">Completed</SelectItem>
												<SelectItem value="Abandoned">Abandoned</SelectItem>
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
						</FieldGroup>
					</CardContent>
				</CollapsibleContent>
			</Card>
		</Collapsible>
	)
}
