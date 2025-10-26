import { Button } from '@renderer/components/ui/button'
// Import shadcn/ui components for the Date Picker
import { Calendar } from '@renderer/components/ui/calendar'
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
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@renderer/components/ui/popover'
import { cn } from '@renderer/lib/utils' // Assuming you have a utility for class names
import { format } from 'date-fns'
import { CalendarIcon, ChevronsUpDown, Drill, Target } from 'lucide-react'
import { useState } from 'react'
import {
	Controller,
	type ControllerFieldState,
	type UseFormReturn,
} from 'react-hook-form'
import type { DrillholeFormValues } from './schema'

interface SectionProps {
	form: UseFormReturn<DrillholeFormValues>
}

// Helper component for the Date Picker logic to keep the main component clean
// This integrates the shadcn/ui Popover and Calendar into your Field structure
const DatePickerField = ({
	field,
	fieldState,
	label,
	htmlFor,
}: {
	field: any
	fieldState: ControllerFieldState
	label: string
	htmlFor: string
}) => {
	const [open, setOpen] = useState(false)
	return (
		<Field data-invalid={fieldState.invalid}>
			<FieldLabel className="font-source-sans-pro text-base!" htmlFor={htmlFor}>
				{label}
			</FieldLabel>
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button
						variant={'outline'}
						className={cn(
							'w-full justify-start text-left font-source-sans-pro text-base! shadow-none py-5 bg-gray-200/30',
							!field.value && 'text-muted-foreground',
							fieldState.invalid && 'border-red-500',
						)}
						id={htmlFor}
						aria-invalid={fieldState.invalid}
					>
						{field.value ? (
							format(field.value, 'PPP')
						) : (
							<span>Pick a date</span>
						)}
						<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-auto p-0 z-100" align="start">
					<Calendar
						mode="single"
						selected={field.value}
						onSelect={(date) => {
							field.onChange(date)
							setOpen(false)
						}}
						autoFocus
						// Optional: Set date constraints if needed, like your example:
						// disabled={(date) => date > new Date()}
						captionLayout="dropdown"
					/>
				</PopoverContent>
			</Popover>
			{fieldState.invalid && (
				<FieldError
					className="font-source-sans-pro"
					errors={[fieldState.error]}
				/>
			)}
		</Field>
	)
}

export default function DrillingInfoSection({ form }: SectionProps) {
	return (
		<Collapsible className="w-full mt-4" defaultOpen>
			<Card className="gap-2 py-3 shadow-none rounded-sm">
				<CardHeader className="flex-col items-center gap-0">
					<CollapsibleTrigger asChild>
						<div className="flex flex-row justify-between items-center w-full">
							<div className="flex flex-row gap-2 items-center">
								<Drill size={20} />
								<p className="text-lg font-medium font-lato">
									DRILLING INFORMATION
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
							{/* Contractor */}
							<Controller
								name="drillingInfo.contractor"
								control={form.control}
								render={({ field, fieldState }) => (
									<Field data-invalid={fieldState.invalid}>
										<FieldLabel
											className="font-source-sans-pro text-base!"
											htmlFor="drillingInfo-contractor"
										>
											Contractor
										</FieldLabel>
										<Input
											{...field}
											className="font-source-sans-pro text-base! shadow-none py-5 bg-gray-200/30"
											id={field.name}
											aria-invalid={fieldState.invalid}
											placeholder="Enter drilling contractor name"
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

							{/* Logged By */}
							<Controller
								name="drillingInfo.loggedBy"
								control={form.control}
								render={({ field, fieldState }) => (
									<Field data-invalid={fieldState.invalid}>
										<FieldLabel
											className="font-source-sans-pro text-base!"
											htmlFor="drillingInfo-loggedBy"
										>
											Logged By
										</FieldLabel>
										<Input
											{...field}
											className="font-source-sans-pro text-base! shadow-none py-5 bg-gray-200/30"
											id={field.name}
											aria-invalid={fieldState.invalid}
											placeholder="Enter name of logger"
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

							{/* Start Date - REPLACED WITH DATE PICKER */}
							<Controller
								name="drillingInfo.startDate"
								control={form.control}
								render={({ field, fieldState }) => (
									<DatePickerField
										field={field}
										fieldState={fieldState}
										label="Start Date"
										htmlFor="drillingInfo-startDate"
									/>
								)}
							/>

							{/* End Date - REPLACED WITH DATE PICKER */}
							<Controller
								name="drillingInfo.endDate"
								control={form.control}
								render={({ field, fieldState }) => (
									<DatePickerField
										field={field}
										fieldState={fieldState}
										label="End Date"
										htmlFor="drillingInfo-endDate"
									/>
								)}
							/>

							{/* Entered On - REPLACED WITH DATE PICKER */}
							<Controller
								name="drillingInfo.enteredOn"
								control={form.control}
								render={({ field, fieldState }) => (
									<DatePickerField
										field={field}
										fieldState={fieldState}
										label="Entered On"
										htmlFor="drillingInfo-enteredOn"
									/>
								)}
							/>

							{/* Final Depth */}
							<Controller
								name="drillingInfo.finalDepth"
								control={form.control}
								render={({ field, fieldState }) => (
									<Field data-invalid={fieldState.invalid}>
										<FieldLabel
											className="font-source-sans-pro text-base!"
											htmlFor="drillingInfo-finalDepth"
										>
											Final Depth
										</FieldLabel>
										<Input
											{...field}
											className="font-source-sans-pro text-base! shadow-none py-5 bg-gray-200/30"
											id={field.name}
											type="number"
											aria-invalid={fieldState.invalid}
											placeholder="Enter final depth"
											// The onChange and value logic is correct for number inputs
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
