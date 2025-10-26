import {
	createContext,
	type ReactNode,
	useCallback,
	useContext,
	useState,
} from 'react'

interface TableFormContextValue {
	onSave: (() => void) | null
	onAddRow: (() => void) | null
	registerFormActions: (actions: {
		onSave: () => void
		onAddRow: () => void
	}) => void
	unregisterFormActions: () => void
}

const TableFormContext = createContext<TableFormContextValue | null>(null)

export function TableFormProvider({ children }: { children: ReactNode }) {
	const [onSave, setOnSave] = useState<(() => void) | null>(null)
	const [onAddRow, setOnAddRow] = useState<(() => void) | null>(null)

	const registerFormActions = useCallback(
		(actions: { onSave: () => void; onAddRow: () => void }) => {
			setOnSave(() => actions.onSave)
			setOnAddRow(() => actions.onAddRow)
		},
		[],
	)

	const unregisterFormActions = useCallback(() => {
		setOnSave(null)
		setOnAddRow(null)
	}, [])

	return (
		<TableFormContext.Provider
			value={{ onSave, onAddRow, registerFormActions, unregisterFormActions }}
		>
			{children}
		</TableFormContext.Provider>
	)
}

export function useTableForm() {
	const context = useContext(TableFormContext)
	if (!context) {
		throw new Error(
			'useTableFormContext must be used within a TableFormProvider',
		)
	}
	return context
}
