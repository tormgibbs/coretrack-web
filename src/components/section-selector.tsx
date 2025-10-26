import { Plus, Save } from 'lucide-react'
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { useAppStore } from '@/stores/app-store'
import { useTableForm } from '@/tables/table-form-context'
import { Button } from './ui/button'
import { Label } from './ui/label'

const LOGGING_SECTIONS = [
	{ value: 'lithology', label: 'Lithology', count: 12 },
	{ value: 'alteration', label: 'Alteration', count: 7 },
	{ value: 'recovery', label: 'Recovery', count: 4 },
	{ value: 'mineralization', label: 'Mineralization', count: 9 },
	{ value: 'sedimentology', label: 'Sedimentology', count: 5 },
	{ value: 'stratigraphy', label: 'Stratigraphy', count: 0 },
]

const SectionSelector: React.FC = () => {
	const { currentDrillholeId, currentSectionValue, setCurrentSection } =
		useAppStore()
	const { onSave, onAddRow } = useTableForm()

	const isDisabled = !currentDrillholeId

	return (
		<div className="flex flex-row sticky top-16 h-16 z-40 bg-background items-center justify-between px-4 border-b">
			<div className="flex flex-row items-center gap-2">
				<Label className="font-lato text-base font-medium text-muted-foreground">
					Active Table:
				</Label>
				<Select
					disabled={isDisabled}
					value={currentSectionValue}
					onValueChange={setCurrentSection}
				>
					<SelectTrigger className="w-[220px] shadow-none font-lato text-base">
						<SelectValue placeholder="Select a Section" />
					</SelectTrigger>
					<SelectContent className="max-h-80 overflow-y-auto font-lato shadow-none">
						<SelectGroup>
							{LOGGING_SECTIONS.map((section) => {
								return (
									<SelectItem key={section.value} value={section.value}>
										<div className="flex justify-between w-full">
											<span className="font-medium">{section.label}</span>
											<span className="text-muted-foreground ml-4">
												({section.count})
											</span>
										</div>
									</SelectItem>
								)
							})}
						</SelectGroup>
					</SelectContent>
				</Select>
			</div>
			<div className="flex flex-row items-center gap-3">
				<Button
					disabled={isDisabled || !onAddRow}
					onClick={onAddRow || undefined}
					variant="outline"
					className="font-lato border-none text-white bg-[#1d3d5d] text-sm px-10 py-5 rounded-sm shadow-none hover:bg-[#2a5278] hover:text-white active:bg-[#163049] transition-colors disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed disabled:opacity-60"
				>
					<Plus />
					Add Row
				</Button>
				<Button
					disabled={isDisabled || !onSave}
					onClick={onSave || undefined}
					variant="outline"
					className="font-lato border-none text-white bg-[#1d3d5d] text-sm px-10 py-5 rounded-sm shadow-none hover:bg-[#2a5278] hover:text-white active:bg-[#163049] transition-colors disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed disabled:opacity-60"
				>
					<Save />
					Save
				</Button>
			</div>
		</div>
	)
}

export default SectionSelector
