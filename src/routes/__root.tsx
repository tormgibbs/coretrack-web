import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import * as React from 'react'
import { SidebarProvider } from '@/components/ui/sidebar'
import { checkAuth } from '@/lib/auth'

export interface RouterContext {
	isAuthenticated: boolean
}

// Lazy load DevTools logic remains the same
const LazyDevtools = React.lazy(async () => {
	const devtoolsModule = await import('@tanstack/react-devtools')
	const routerDevtoolsModule = await import('@tanstack/react-router-devtools')

	return {
		default: () => (
			<devtoolsModule.TanStackDevtools
				config={{
					position: 'bottom-right',
				}}
				plugins={[
					{
						name: 'Tanstack Router',
						render: <routerDevtoolsModule.TanStackRouterDevtoolsPanel />,
					},
				]}
			/>
		),
	}
})

const TanstackDevtools = () => {
	if (import.meta.env.PROD) {
		return null
	}
	return (
		<React.Suspense fallback={null}>
			<LazyDevtools />
		</React.Suspense>
	)
}

export const Route = createRootRouteWithContext<RouterContext>()({
	beforeLoad: async () => {
		const { isAuthenticated } = await checkAuth()
		return { isAuthenticated }
	},
	component: () => (
		<SidebarProvider
			style={
				{
					'--sidebar-width': '15rem',
				} as React.CSSProperties
			}
		>
			<Outlet />
			<TanstackDevtools />
		</SidebarProvider>
	),
})
