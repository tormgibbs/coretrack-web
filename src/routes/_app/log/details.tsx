import { createFileRoute } from '@tanstack/react-router'
import EmptyStateAlert from '@/components/empty-state-alert'
import SectionSelector from '@/components/section-selector'
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from '@/components/ui/resizable'
import { AlterationForm } from '@/forms/alteration-form'
import { LithologyForm } from '@/forms/lithology-form'
import { MineralizationForm } from '@/forms/mineralization-form'
import { RecoveryForm } from '@/forms/recovery-form'
import { SedimentologyForm } from '@/forms/sedimentology-form'
import { useAppStore } from '@/stores/app-store'
import { TableFormProvider } from '@/tables/table-form-context'

export const Route = createFileRoute('/_app/log/details')({
	component: RouteComponent,
})

const FORM_MAP = {
	lithology: LithologyForm,
	alteration: AlterationForm,
	mineralization: MineralizationForm,
	recovery: RecoveryForm,
	sedimentology: SedimentologyForm,
} as const

function RouteComponent() {
	const { currentProjectId, currentDrillholeId, currentSectionValue } =
		useAppStore()
	const ActiveFormComponent =
		FORM_MAP[currentSectionValue as keyof typeof FORM_MAP]

	const canShowContent = currentProjectId && currentDrillholeId

	return (
		<TableFormProvider>
			<SectionSelector />
			<div className="flex flex-1 flex-col overflow-hidden">
				{canShowContent ? (
					<div className="flex flex-1 border-2 border-green">
						<ResizablePanelGroup direction="horizontal">
							<ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
								One
							</ResizablePanel>
							<ResizableHandle />
							<ResizablePanel defaultSize={80} className="p-4">
								{ActiveFormComponent && <ActiveFormComponent />}
							</ResizablePanel>
						</ResizablePanelGroup>
					</div>
				) : (
					<EmptyStateAlert description="Please select or create a project and drillhole to view log data." />
				)}
			</div>
		</TableFormProvider>
	)
}
