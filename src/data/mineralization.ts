import type { MineralizationRecord } from '@/lib/types'

export const mineralizationMockData: MineralizationRecord[] = [
	{
		id: 'min-1',
		depthFrom: 1.2,
		depthTo: 3.0,
		mineralName: 'Chalcopyrite',
		intensity: 2.5,
	},
	{
		id: 'min-2',
		depthFrom: 8.5,
		depthTo: 9.9,
		mineralName: 'Gold',
		intensity: 0.8,
	},
	{
		id: 'min-3',
		depthFrom: 14.1,
		depthTo: 14.5,
		mineralName: 'Sphalerite',
		intensity: 5.1,
	},
]
