import DrillholeForm from '@renderer/components/forms/drillhole'
import { Button } from '@renderer/components/ui/button'
import { createFileRoute } from '@tanstack/react-router'
import { AlertCircle, Save } from 'lucide-react'
import EmptyStateAlert from '@/components/empty-state-alert'
import { useAppStore } from '@/stores/app-store'

export const Route = createFileRoute('/_app/log/drillhole')({
	component: RouteComponent,
})

function RouteComponent() {
	const { currentProjectId, currentDrillholeId } = useAppStore()

	const canShowForm = currentProjectId && currentDrillholeId

	return (
		<div className="flex flex-1 flex-col p-4">
			{canShowForm ? (
				<>
					<div className="flex flex-row justify-between items-center mb-4">
						<p className="text-2xl font-montserrat">Drill Hole Logging</p>
						<Button
							variant="outline"
							size="lg"
							className="font-montserrat bg-[#C9A040] text-[#1D3D5E] font-medium shadow-none border-none cursor-pointer hover:bg-[#BF9636]"
						>
							<Save />
							Save Drill Hole
						</Button>
					</div>

					<DrillholeForm />
				</>
			) : (
				<EmptyStateAlert description="Please select or create a project and drillhole to begin logging." />
			)}
		</div>
	)
}
