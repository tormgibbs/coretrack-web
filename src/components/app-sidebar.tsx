import { Link } from '@tanstack/react-router'
import {
	Calendar,
	ChevronRight,
	Home,
	Inbox,
	Mountain,
	Search,
	Settings,
} from 'lucide-react'
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
} from '@/components/ui/sidebar'
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from './ui/collapsible'

// Menu items.
const items = [
	{
		title: 'Home',
		url: '/',
		icon: Home,
		hasSubmenu: false,
	},
	{
		title: 'Analytics',
		url: '#',
		icon: Inbox,
		hasSubmenu: false,
	},
	{
		title: 'Log',
		url: '#',
		icon: Calendar,
		hasSubmenu: true,
		items: [
			{
				title: 'Drillhole',
				url: '/log/drillhole',
				content: 'View and manage drillhole records.',
			},
			{
				title: 'Details',
				url: '/log/details',
				content: 'Edit and review log details.',
			},
			{
				title: 'Sample',
				url: '/log/sample',
				content: 'Process sample collection data.',
			},
		],
	},
	{
		title: 'Import',
		url: '#',
		icon: Search,
		hasSubmenu: false,
	},
	{
		title: 'Export',
		url: '#',
		icon: Settings,
		hasSubmenu: false,
	},
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar collapsible="icon" {...props}>
			<SidebarHeader>
				<div className="flex flex-row items-center gap-3">
					<div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
						<Mountain size={16} />
					</div>
					<div className="grid flex-1 text-left text-sm leading-tight">
						<span className="truncate text-2xl font-medium">CoreTrack</span>
					</div>
				</div>
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupContent>
						<SidebarMenu className='gap-3'>
							{items.map((item) =>
								item.hasSubmenu ? (
									<Collapsible
										key={item.title}
										asChild
										className="group/collapsible"
									>
										<SidebarMenuItem>
											<CollapsibleTrigger asChild className="w-full">
												<SidebarMenuButton tooltip={item.title}>
													{item.icon && <item.icon />}
													<span>{item.title}</span>
													<ChevronRight
														size={16}
														className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
													/>
												</SidebarMenuButton>
											</CollapsibleTrigger>

											<CollapsibleContent>
												<SidebarMenuSub>
													{item.items?.map((subItem) => (
														<SidebarMenuSubItem key={subItem.title}>
															<SidebarMenuSubButton asChild>
																<Link to={subItem.url}>
																	<span>{subItem.title}</span>
																</Link>
															</SidebarMenuSubButton>
														</SidebarMenuSubItem>
													))}
												</SidebarMenuSub>
											</CollapsibleContent>
										</SidebarMenuItem>
									</Collapsible>
								) : (
									<SidebarMenuItem key={item.title}>
										<SidebarMenuButton asChild>
											<Link to={item.url}>
												<item.icon />
												<span>{item.title}</span>
											</Link>
										</SidebarMenuButton>
									</SidebarMenuItem>
								),
							)}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
	)
}
