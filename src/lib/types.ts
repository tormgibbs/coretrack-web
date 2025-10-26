import type { UseFieldArrayAppend } from 'react-hook-form'
import type * as z from 'zod'
import type {
	lithologyRecordSchema,
	mineralizationRecordSchema,
} from '@/tables/schema'

export type LoggingSection = {
	value: string
	label: string
	count: number
}

export type Appender<TRecord extends AnyLogRecord> = UseFieldArrayAppend<
	{ records: TRecord[] },
	'records'
>

export type LithologyRecord = z.infer<typeof lithologyRecordSchema>

export type MineralizationRecord = z.infer<typeof mineralizationRecordSchema>

export type AnyLogRecord = LithologyRecord | MineralizationRecord
