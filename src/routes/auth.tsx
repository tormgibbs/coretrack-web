import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/auth')({
	component: AuthLayoutMinimal,
})

function AuthLayoutMinimal() {
	return (
		<div className="auth-wrapper flex flex-1 h-screen">
			<Outlet />
		</div>
	)
}
