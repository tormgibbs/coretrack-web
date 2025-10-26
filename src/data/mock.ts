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
	{ id: 'proj-1', name: 'Alpha Site' },
	{ id: 'proj-2', name: 'Bravo Zone' },
	{ id: 'proj-3', name: 'Charlie Sector' },
	{ id: 'proj-4', name: 'Delta Block' },
	{ id: 'proj-5', name: 'Echo Field' },
	{ id: 'proj-6', name: 'Foxtrot Area' },
	{ id: 'proj-7', name: 'Golf Unit' },
	{ id: 'proj-8', name: 'Hotel Ridge' },
	{ id: 'proj-9', name: 'India Pit' },
];

export const drillholes: Drillhole[] = [
	// Alpha Site
	{ id: 'dh-1', projectId: 'proj-1', holeNo: 'ALPHA-001' },
	{ id: 'dh-2', projectId: 'proj-1', holeNo: 'ALPHA-002' },
	{ id: 'dh-3', projectId: 'proj-1', holeNo: 'ALPHA-003' },

	// Bravo Zone
	{ id: 'dh-4', projectId: 'proj-2', holeNo: 'BRAVO-001' },
	{ id: 'dh-5', projectId: 'proj-2', holeNo: 'BRAVO-002' },
	{ id: 'dh-6', projectId: 'proj-2', holeNo: 'BRAVO-003' },

	// Charlie Sector
	{ id: 'dh-7', projectId: 'proj-3', holeNo: 'CHARLIE-001' },
	{ id: 'dh-8', projectId: 'proj-3', holeNo: 'CHARLIE-002' },
	{ id: 'dh-9', projectId: 'proj-3', holeNo: 'CHARLIE-003' },

	// Delta Block
	{ id: 'dh-10', projectId: 'proj-4', holeNo: 'DELTA-001' },
	{ id: 'dh-11', projectId: 'proj-4', holeNo: 'DELTA-002' },
	{ id: 'dh-12', projectId: 'proj-4', holeNo: 'DELTA-003' },

	// Echo Field
	{ id: 'dh-13', projectId: 'proj-5', holeNo: 'ECHO-001' },
	{ id: 'dh-14', projectId: 'proj-5', holeNo: 'ECHO-002' },
	{ id: 'dh-15', projectId: 'proj-5', holeNo: 'ECHO-003' },

	// Block 5
	{ id: 'dh-16', projectId: 'proj-6', holeNo: 'BLOCK5-001' },
	{ id: 'dh-17', projectId: 'proj-6', holeNo: 'BLOCK5-002' },
	{ id: 'dh-18', projectId: 'proj-6', holeNo: 'BLOCK5-003' },

	// Block 7 & 8
	{ id: 'dh-19', projectId: 'proj-7', holeNo: 'BLOCK78-001' },
	{ id: 'dh-20', projectId: 'proj-7', holeNo: 'BLOCK78-002' },
	{ id: 'dh-21', projectId: 'proj-7', holeNo: 'BLOCK78-003' },

	// Block Pillage
	{ id: 'dh-22', projectId: 'proj-8', holeNo: 'PILLAGE-001' },
	{ id: 'dh-23', projectId: 'proj-8', holeNo: 'PILLAGE-002' },
	{ id: 'dh-24', projectId: 'proj-8', holeNo: 'PILLAGE-003' },

	// PIT 4
	{ id: 'dh-25', projectId: 'proj-9', holeNo: 'PIT4-001' },
	{ id: 'dh-26', projectId: 'proj-9', holeNo: 'PIT4-002' },
	{ id: 'dh-27', projectId: 'proj-9', holeNo: 'PIT4-003' },
]

// Helper function to get drillholes by project
export const getDrillholesByProject = (projectId: string) => {
	return drillholes.filter((dh) => dh.projectId === projectId)
}
