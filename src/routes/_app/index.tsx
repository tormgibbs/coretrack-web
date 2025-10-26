import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/')({
	beforeLoad: async ({ context }) => {
    if (!context.isAuthenticated) {
      throw redirect({ to: '/auth/login' })
    }
	},
	component: RouteComponent,
})

function RouteComponent() {
	return (
		<div className="flex flex-1 justify-center items-center ">
			<h1 className="text-4xl font-bold text-gray-800">
				Hello, Electron with React Router by Selase!
			</h1>
		</div>
	)
}
