import { z } from 'zod'

export const drillholeDetailsSchema = z.object({
	holeType: z.enum(['DD', 'RC', 'RAC']),
	holeSize: z.enum(['NQ', 'HQ', 'PQ']),
	location: z.string().min(1),
	unitOfMeasure: z.enum(['meters', 'feet']),
	unitOfDegree: z.enum(['degrees', 'gradians']),
	maximumDepth: z.number().min(0),
})

export const collarCoordinatesSchema = z.object({
	easting: z.number().min(0, 'Easting must be positive.'),
	northing: z.number().min(0, 'Northing must be positive.'),
	elevation: z.number(),
	datum: z.string().min(1, 'Datum is required.'),
})

export const collarSurveySchema = z.object({
	dip: z.number().min(-90, 'Min dip is -90').max(90, 'Max dip is 90'),
	azimuth: z.number().min(0, 'Min azimuth is 0').max(360, 'Max azimuth is 360'),
	surveyMethod: z.string().min(1, 'Survey method is required.'),
})

export const drillingInfoSchema = z.object({
	contractor: z.string().min(1, 'Contractor is required.'),
	loggedBy: z.string().min(1, 'Logged By is required.'),
	startDate: z.string().min(1, 'Start Date is required.'),
	endDate: z.string().min(1, 'End Date is required.'),
	enteredOn: z.string().min(1, 'Entered On is required.'),
	finalDepth: z.number().min(0, 'Final Depth must be positive.'),
})

export const customFieldsSchema = z.object({
	drillPurpose: z.string().min(1, 'Drill purpose is required'),
	drilledFrom: z.string().min(1, 'Drilled from is required'),
	domainCode: z.string().min(1, 'Domain code is required'),
	subLevel: z.string().min(1, 'Sub-level is required'),
	holeStatus: z
		.enum(['Pending', 'Active', 'Completed', 'Abandoned'])
		.default('Pending'),
})

export const drillholeFormSchema = z.object({
	details: drillholeDetailsSchema,
	collarCoordinates: collarCoordinatesSchema,
	collarSurvey: collarSurveySchema,
	drillingInfo: drillingInfoSchema,
	comments: z.string().optional(),
	customFields: customFieldsSchema,
})

export type DrillholeFormValues = z.infer<typeof drillholeFormSchema>
