/** biome-ignore-all lint/correctness/noChildrenProp: <explanation> */
import { useForm } from '@tanstack/react-form'
import { useNavigate } from '@tanstack/react-router'
import { z } from 'zod'
import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Button } from '../ui/button'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../ui/select'

const loginFormSchema = z.object({
	username: z.string().min(3, 'Username must be at least 3 characters long'),
	password: z.string().min(6, 'Password must be at least 6 characters long'),
	environment: z.enum(['local', 'remote', 'cental']),
})

export type LoginFormValues = z.infer<typeof loginFormSchema>

export const LoginForm = () => {
	const navigate = useNavigate()

	const form = useForm({
		defaultValues: {
			username: '',
			password: '',
			environment: 'local' as 'local' | 'remote' | 'cental',
		},
		validators: {
			onSubmit: loginFormSchema,
		},
		onSubmit: (values) => {
			const mockToken = 'some-valid-jwt-token'
			localStorage.setItem('userToken', mockToken)
			navigate({ to: '/', replace: true })
		},
	})

	return (
		<form
			className="space-y-10"
			onSubmit={(e) => {
				e.preventDefault()
				form.handleSubmit()
			}}
		>
			<div className="flex items-start flex-col gap-1">
				<p className="text-4xl font-bold text-center">Welcome Back</p>
				<p className="text-muted-foreground">
					Sign in to access the CoreTrack management system
				</p>
			</div>
			<FieldGroup className="">
				<form.Field
					name="username"
					children={(field) => {
						const isInvalid =
							field.state.meta.isTouched && !field.state.meta.isValid
						return (
							<Field data-invalid={isInvalid}>
								<FieldLabel htmlFor={field.name}>Username</FieldLabel>
								<Input
									className="shadow-none py-5"
									id={field.name}
									name={field.name}
									value={field.state.value}
									onBlur={field.handleBlur}
									onChange={(e) => field.handleChange(e.target.value)}
									aria-invalid={isInvalid}
									placeholder="your_username"
									autoComplete="username"
								/>
								{isInvalid && <FieldError errors={field.state.meta.errors} />}
							</Field>
						)
					}}
				/>

				<form.Field
					name="password"
					children={(field) => {
						const isInvalid =
							field.state.meta.isTouched && !field.state.meta.isValid
						return (
							<Field data-invalid={isInvalid}>
								<FieldLabel htmlFor={field.name}>Password</FieldLabel>
								<Input
									className="shadow-none py-5"
									id={field.name}
									name={field.name}
									value={field.state.value}
									onBlur={field.handleBlur}
									onChange={(e) => field.handleChange(e.target.value)}
									aria-invalid={isInvalid}
									type="password"
									placeholder="••••••••"
									autoComplete="current-password"
								/>
								{isInvalid && <FieldError errors={field.state.meta.errors} />}
							</Field>
						)
					}}
				/>

				<form.Field
					name="environment"
					children={(field) => {
						const isInvalid =
							field.state.meta.isTouched && !field.state.meta.isValid
						return (
							<Field data-invalid={isInvalid}>
								<FieldLabel htmlFor={field.name}>Environment</FieldLabel>
								<Select
									name={field.name}
									value={field.state.value}
									onValueChange={field.handleChange}
								>
									<SelectTrigger
										className="shadow-none py-5"
										id={field.name}
										aria-invalid={isInvalid}
									>
										<SelectValue placeholder="Select Environment" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="local">Local</SelectItem>
										<SelectItem value="remote">Remote</SelectItem>
										<SelectItem value="cental">Central</SelectItem>
									</SelectContent>
								</Select>
								{isInvalid && <FieldError errors={field.state.meta.errors} />}
							</Field>
						)
					}}
				/>
			</FieldGroup>

			<Button
				type="submit"
				className="w-full py-5 bg-[#cea850] hover:bg-[#b59446] text-white font-bold cursor-pointer"
				// Disable button while form is submitting or if validation is running
				disabled={form.state.isSubmitting || !form.state.isFormValid}
			>
				{form.state.isSubmitting ? 'Logging in...' : 'Log In'}
			</Button>
		</form>
	)
}
