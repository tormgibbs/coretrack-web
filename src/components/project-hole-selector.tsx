import { Plus } from 'lucide-react'
import type * as React from 'react'
import { useMemo } from 'react'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { getDrillholesByProject, projects } from '@/data/mock'
import { useAppStore } from '@/stores/app-store'
import { Button } from './ui/button'
import { Label } from './ui/label'

const ProjectHoleSelector: React.FC = () => {
	const {
		currentProjectId,
		currentDrillholeId,
		selectProject,
		selectDrillhole,
	} = useAppStore()

	const availableDrillholes = useMemo(() => {
		if (!currentProjectId) return []
		return getDrillholesByProject(currentProjectId)
	}, [currentProjectId])

	const handleProjectChange = (projectId: string) => {
		selectProject(projectId)
	}

	return (
		<div className="flex flex-row gap-4">
			<div className="flex flex-row gap-2 items-center">
				<Label className="font-lato text-base font-medium text-muted-foreground">
					Project:
				</Label>
				<Select
					value={currentProjectId || ''}
					onValueChange={handleProjectChange}
				>
					<SelectTrigger className="w-[180px] shadow-none font-source-sans-pro text-base">
						<SelectValue placeholder="Select project" />
					</SelectTrigger>
					<SelectContent className="font-source-sans-pro shadow-none">
						{projects.map((project) => (
							<SelectItem key={project.id} value={project.id}>
								{project.name}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
				<Button
					className="shadow-none"
					variant="outline"
					size="icon"
					aria-label="Add Project"
				>
					<Plus />
				</Button>
			</div>

			<div className="flex flex-row gap-2 items-center">
				<Label className="font-lato text-base font-medium text-muted-foreground">
					Drillhole:
				</Label>
				<Select
					value={currentDrillholeId || ''}
					onValueChange={selectDrillhole}
					disabled={!currentProjectId}
				>
					<SelectTrigger className="w-[180px] shadow-none font-source-sans-pro text-base">
						<SelectValue placeholder="Select drillhole" />
					</SelectTrigger>
					<SelectContent className="font-source-sans-pro shadow-none">
						{availableDrillholes.map((drillhole) => (
							<SelectItem key={drillhole.id} value={drillhole.id}>
								{drillhole.holeNo}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
				<Button
					className="shadow-none"
					variant="outline"
					size="icon"
					aria-label="Add Drillhole"
				>
					<Plus />
				</Button>
			</div>
		</div>
	)
}

export default ProjectHoleSelector
