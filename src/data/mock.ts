export interface Project {
	id: string
	name: string
}

export interface Drillhole {
	id: string
	projectId: string
	holeNo: string
}

export const projects: Project[] = [
	{ id: 'proj-1', name: 'Adjopa' },
	{ id: 'proj-2', name: 'Badukrom' },
	{ id: 'proj-3', name: 'Block 1' },
	{ id: 'proj-4', name: 'Block 2 & 3' },
	{ id: 'proj-5', name: 'Block 4' },
	{ id: 'proj-6', name: 'Block 5' },
	{ id: 'proj-7', name: 'Block 7 & 8' },
	{ id: 'proj-8', name: 'Block Pillage' },
	{ id: 'proj-9', name: 'PIT 4' },
]

export const drillholes: Drillhole[] = [
	// Adjopa
	{ id: 'dh-1', projectId: 'proj-1', holeNo: 'ADJ-001' },
	{ id: 'dh-2', projectId: 'proj-1', holeNo: 'ADJ-002' },
	{ id: 'dh-3', projectId: 'proj-1', holeNo: 'ADJ-003' },

	// Badukrom
	{ id: 'dh-4', projectId: 'proj-2', holeNo: 'BAD-001' },
	{ id: 'dh-5', projectId: 'proj-2', holeNo: 'BAD-002' },
	{ id: 'dh-6', projectId: 'proj-2', holeNo: 'BAD-003' },

	// Block 1
	{ id: 'dh-7', projectId: 'proj-3', holeNo: 'BLK1-001' },
	{ id: 'dh-8', projectId: 'proj-3', holeNo: 'BLK1-002' },
	{ id: 'dh-9', projectId: 'proj-3', holeNo: 'BLK1-003' },

	// Block 2 & 3
	{ id: 'dh-10', projectId: 'proj-4', holeNo: 'BLK23-001' },
	{ id: 'dh-11', projectId: 'proj-4', holeNo: 'BLK23-002' },
	{ id: 'dh-12', projectId: 'proj-4', holeNo: 'BLK23-003' },

	// Block 4
	{ id: 'dh-13', projectId: 'proj-5', holeNo: 'BLK4-001' },
	{ id: 'dh-14', projectId: 'proj-5', holeNo: 'BLK4-002' },
	{ id: 'dh-15', projectId: 'proj-5', holeNo: 'BLK4-003' },

	// Block 5
	{ id: 'dh-16', projectId: 'proj-6', holeNo: 'BLK5-001' },
	{ id: 'dh-17', projectId: 'proj-6', holeNo: 'BLK5-002' },
	{ id: 'dh-18', projectId: 'proj-6', holeNo: 'BLK5-003' },

	// Block 7 & 8
	{ id: 'dh-19', projectId: 'proj-7', holeNo: 'BLK78-001' },
	{ id: 'dh-20', projectId: 'proj-7', holeNo: 'BLK78-002' },
	{ id: 'dh-21', projectId: 'proj-7', holeNo: 'BLK78-003' },

	// Block Pillage
	{ id: 'dh-22', projectId: 'proj-8', holeNo: 'PILG-001' },
	{ id: 'dh-23', projectId: 'proj-8', holeNo: 'PILG-002' },
	{ id: 'dh-24', projectId: 'proj-8', holeNo: 'PILG-003' },

	// PIT 4
	{ id: 'dh-25', projectId: 'proj-9', holeNo: 'PIT4-001' },
	{ id: 'dh-26', projectId: 'proj-9', holeNo: 'PIT4-002' },
	{ id: 'dh-27', projectId: 'proj-9', holeNo: 'PIT4-003' },
]

// Helper function to get drillholes by project
export const getDrillholesByProject = (projectId: string) => {
	return drillholes.filter((dh) => dh.projectId === projectId)
}
