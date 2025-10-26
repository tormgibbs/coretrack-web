import { createFileRoute } from '@tanstack/react-router'
import { Dot, Mountain } from 'lucide-react'
import { LoginForm } from '@/components/forms/login-form'

export const Route = createFileRoute('/auth/login')({
	component: RouteComponent,
})

function RouteComponent() {
	return (
		<div className="flex flex-row h-screen">
			<div className="flex text-white flex-1 flex-col items-start justify-center bg-[#1d3d5d] px-10 space-y-5">
				<Mountain size={60} />
				<div className="space-y-3">
					<p className="text-4xl font-extrabold">CoreTrack</p>
					<p className="text-xl text-white/80">
						Geology Data Management System
					</p>
				</div>

				<p className="text-lg text-white/80">
					Professional drilling data management for AngloGold Ashanti's
					exploration and mining operations.
				</p>

				<div className="text-lg text-white/80">
					<div className="flex flex-row">
						<Dot />
						<p>Comprehensive drill hole logging</p>
					</div>
					<div className="flex flex-row">
						<Dot />
						<p>Real-time data synchronization</p>
					</div>
					<div className="flex flex-row">
						<Dot />
						<p>Multi-environment support</p>
					</div>
				</div>
			</div>
			<div className="flex flex-1 items-center justify-center">
				<LoginForm />
			</div>
		</div>
	)
}
