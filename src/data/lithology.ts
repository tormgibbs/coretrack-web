import type { LithologyRecord } from '@/lib/types'

export const lithologyMockData: LithologyRecord[] = [
	{
		id: 'litho-1',
		depthFrom: 0,
		depthTo: 5.5,
		rockType: 'Basalt',
		description: 'Fine-grained, dark grey, massive.',
	},
	{
		id: 'litho-2',
		depthFrom: 5.5,
		depthTo: 12.0,
		rockType: 'Shale',
		description: 'Black, finely laminated, weak pyrite.',
	},
	{
		id: 'litho-3',
		depthFrom: 12.0,
		depthTo: 15.8,
		rockType: 'Granite',
		description: 'Coarse-grained, pink-grey, heavily fractured.',
	},
]
