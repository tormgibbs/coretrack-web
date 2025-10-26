import * as PopoverPrimitive from '@radix-ui/react-popover'
import { CheckIcon, ChevronDownIcon } from 'lucide-react'
import type * as React from 'react'
import { createContext, useContext, useState } from 'react'

import { cn } from '@/lib/utils'

interface MultiSelectContextValue {
	value: string[]
	onValueChange: (value: string[]) => void
	open: boolean
	setOpen: (open: boolean) => void
}

const MultiSelectContext = createContext<MultiSelectContextValue | undefined>(
	undefined,
)

function useMultiSelect() {
	const context = useContext(MultiSelectContext)
	if (!context) {
		throw new Error('useMultiSelect must be used within MultiSelect')
	}
	return context
}

function MultiSelect({
	value = [],
	onValueChange,
	children,
	...props
}: {
	value?: string[]
	onValueChange?: (value: string[]) => void
	children: React.ReactNode
} & Omit<
	React.ComponentProps<typeof PopoverPrimitive.Root>,
	'value' | 'onValueChange'
>) {
	const [open, setOpen] = useState(false)

	return (
		<MultiSelectContext.Provider
			value={{
				value,
				onValueChange: onValueChange || (() => {}),
				open,
				setOpen,
			}}
		>
			<PopoverPrimitive.Root open={open} onOpenChange={setOpen} {...props}>
				{children}
			</PopoverPrimitive.Root>
		</MultiSelectContext.Provider>
	)
}

function MultiSelectTrigger({
	className,
	size = 'default',
	children,
	placeholder = 'Select items...',
	...props
}: React.ComponentProps<'button'> & {
	size?: 'sm' | 'default'
	placeholder?: string
	children?: React.ReactNode | ((item: string) => React.ReactNode)
}) {
	const { value, onValueChange } = useMultiSelect()

	const handleRemove = (
		e: React.MouseEvent<HTMLButtonElement>,
		item: string,
	) => {
		e.stopPropagation()
		onValueChange(value.filter((v) => v !== item))
	}

	return (
		<PopoverPrimitive.Trigger asChild>
			<button
				data-slot="multi-select-trigger"
				data-size={size}
				className={cn(
					'border-input focus-visible:border-ring focus-visible:ring-ring/50 dark:bg-input/30 dark:hover:bg-input/50 flex w-full min-w-[200px] items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:min-h-9 data-[size=sm]:min-h-8',
					className,
				)}
				{...props}
			>
				<div className="flex flex-1 items-center gap-1.5 overflow-hidden">
					{value.length === 0 ? (
						<span className="text-muted-foreground">{placeholder}</span>
					) : (
						<span className="text-foreground min-w-0 truncate">
							{value.join(', ')}
						</span>
					)}
				</div>
				<ChevronDownIcon className="size-4 opacity-50 shrink-0" />
			</button>
		</PopoverPrimitive.Trigger>
	)
}

function MultiSelectContent({
	className,
	align = 'start',
	sideOffset = 4,
	children,
	...props
}: React.ComponentProps<typeof PopoverPrimitive.Content>) {
	return (
		<PopoverPrimitive.Portal>
			<PopoverPrimitive.Content
				data-slot="multi-select-content"
				align={align}
				sideOffset={sideOffset}
				className={cn(
					'bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-[var(--radix-popover-trigger-width)] min-w-[8rem] overflow-hidden rounded-md border p-1 shadow-md',
					className,
				)}
				{...props}
			>
				{children}
			</PopoverPrimitive.Content>
		</PopoverPrimitive.Portal>
	)
}

function MultiSelectGroup({
	className,
	...props
}: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot="multi-select-group"
			className={cn('overflow-y-auto max-h-[300px]', className)}
			{...props}
		/>
	)
}

function MultiSelectLabel({
	className,
	...props
}: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot="multi-select-label"
			className={cn(
				'text-muted-foreground px-2 py-1.5 text-xs font-medium',
				className,
			)}
			{...props}
		/>
	)
}

function MultiSelectItem({
	className,
	children,
	value,
	disabled,
	...props
}: React.ComponentProps<'button'> & {
	value: string
	disabled?: boolean
}) {
	const { value: selectedValues, onValueChange } = useMultiSelect()
	const isSelected = selectedValues.includes(value)

	const handleSelect = () => {
		if (disabled) return

		if (isSelected) {
			onValueChange(selectedValues.filter((v) => v !== value))
		} else {
			onValueChange([...selectedValues, value])
		}
	}

	return (
		<button
			type="button"
			data-slot="multi-select-item"
			data-selected={isSelected}
			data-disabled={disabled}
			className={cn(
				'focus:bg-accent focus:text-accent-foreground relative flex w-full cursor-pointer items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50 hover:bg-accent hover:text-accent-foreground',
				className,
			)}
			onClick={handleSelect}
			disabled={disabled}
			{...props}
		>
			<span className="absolute right-2 flex size-3.5 items-center justify-center">
				{isSelected && <CheckIcon className="size-4" />}
			</span>
			<span className="flex flex-1 items-center gap-2">{children}</span>
		</button>
	)
}

function MultiSelectSeparator({
	className,
	...props
}: React.ComponentProps<'div'>) {
	return (
		<div
			data-slot="multi-select-separator"
			className={cn('bg-border -mx-1 my-1 h-px', className)}
			{...props}
		/>
	)
}

export {
	MultiSelect,
	MultiSelectContent,
	MultiSelectGroup,
	MultiSelectItem,
	MultiSelectLabel,
	MultiSelectSeparator,
	MultiSelectTrigger,
}
