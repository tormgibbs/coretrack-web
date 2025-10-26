import { create } from 'zustand'

interface AppStore {
	currentProjectId: string | null
	currentDrillholeId: string | null
	currentSectionValue: string

	setCurrentSection: (value: string) => void
	selectProject: (id: string | null) => void
	selectDrillhole: (id: string | null) => void
}

export const useAppStore = create<AppStore>((set) => ({
	currentProjectId: null,
	currentDrillholeId: null,
	currentSectionValue: 'lithology',

	setCurrentSection: (value) => set({ currentSectionValue: value }),
	selectProject: (id) =>
		set((state) => ({
			currentProjectId: id,
			currentDrillholeId:
				id === state.currentProjectId ? state.currentDrillholeId : null,
		})),
	selectDrillhole: (id) => set({ currentDrillholeId: id }),
}))
