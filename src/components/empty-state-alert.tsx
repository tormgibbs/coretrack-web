import { AlertCircle } from 'lucide-react'

interface EmptyStateAlertProps {
	title?: string
	description?: string
	icon?: React.ReactNode
}

export default function EmptyStateAlert({
	title = 'No Project or Drillhole Selected',
	description = 'Please select or create a project and drillhole to continue.',
	icon,
}: EmptyStateAlertProps) {
	return (
		<div className="flex flex-1 flex-col items-center justify-center py-16 gap-4">
			{icon ?? <AlertCircle size={48} className="text-gray-400" />}
			<div className="text-center">
				<p className="text-lg font-lato font-medium text-gray-700">{title}</p>
				<p className="text-sm font-source-sans-pro text-gray-500 mt-2">
					{description}
				</p>
			</div>
		</div>
	)
}
