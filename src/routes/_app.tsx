import { createFileRoute, Outlet } from '@tanstack/react-router'
import { AppSidebar } from '@/components/app-sidebar'
import ProjectHoleSelector from '@/components/project-hole-selector'
import { Separator } from '@/components/ui/separator'
import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar'

export const Route = createFileRoute('/_app')({
	component: AppLayout,
})

function AppLayout() {
	return (
		<>
			<AppSidebar />
			<SidebarInset className="flex flex-1 flex-col overflow-x-hidden">
				<header className="bg-background flex sticky top-0 z-50 h-16 shrink-0 items-center gap-2 border-b px-4">
					<SidebarTrigger className="ml-1" />
					<Separator
						orientation="vertical"
						className="mr-2 data-[orientation=vertical]:h-4"
					/>
					<ProjectHoleSelector />
				</header>
				<main className="flex flex-1 flex-col">
					<Outlet />
				</main>
			</SidebarInset>
		</>
	)
}
