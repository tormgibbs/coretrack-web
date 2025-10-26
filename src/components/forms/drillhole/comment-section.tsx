import { Button } from '@renderer/components/ui/button'
import { Card, CardContent, CardHeader } from '@renderer/components/ui/card'
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from '@renderer/components/ui/collapsible'
import { Field, FieldError, FieldLabel } from '@renderer/components/ui/field'
import { Textarea } from '@renderer/components/ui/textarea'
import { ChevronsUpDown, MessageSquare } from 'lucide-react'
import { Controller, type UseFormReturn } from 'react-hook-form'
import type { DrillholeFormValues } from './schema'

interface SectionProps {
	form: UseFormReturn<DrillholeFormValues>
}

export default function CommentSection({ form }: SectionProps) {
	return (
		<Collapsible className="w-full mt-4" defaultOpen>
			<Card className="gap-2 py-3 shadow-none rounded-sm">
				<CardHeader className="flex-col items-center gap-0">
					<CollapsibleTrigger asChild>
						<div className="flex flex-row justify-between items-center w-full">
							<div className="flex flex-row gap-2 items-center">
								<MessageSquare size={20} />
								<p className="text-lg font-medium font-lato">COMMENTS</p>
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
						<Controller
							name="comments"
							control={form.control}
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel
										className="font-source-sans-pro text-base"
										htmlFor="comments"
									>
										Additional Comments
									</FieldLabel>
									<Textarea
										{...field}
										className="font-source-sans-pro text-base shadow-none bg-gray-200/30 min-h-[120px] resize-y"
										id={field.name}
										aria-invalid={fieldState.invalid}
										placeholder="Enter any additional notes or comments about this drillhole..."
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
					</CardContent>
				</CollapsibleContent>
			</Card>
		</Collapsible>
	)
}
