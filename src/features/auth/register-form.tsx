import { Button } from '@/shared/ui/kit/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/shared/ui/kit/form'
import { Input } from '@/shared/ui/kit/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useRegister } from './use-register'

const schema = z
	.object({
		email: z
			.string({ required_error: 'Email обязателен' })
			.email('Неверный email'),
		password: z
			.string({ required_error: 'Пароль обязателен' })
			.min(6, 'Пароль должен быть не менее 6 символов'),
		confirmPassword: z.string().optional()
	})
	.refine((data) => data.password === data.confirmPassword, {
		path: ['confirmPassword'],
		message: 'Пароли не совпадают'
	})

export const RegisterForm = () => {
	const form = useForm({
		defaultValues: {
			email: '',
			password: '',
			confirmPassword: ''
		},
		resolver: zodResolver(schema)
	})

	const { errorMessage, isPending, register } = useRegister()

	const onSubmit = form.handleSubmit((data) => {
		register(data)
	})

	return (
		<Form {...form}>
			<form
				onSubmit={onSubmit}
				className="flex flex-col gap-4"
			>
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input
									placeholder="bestform@mail.ru"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password</FormLabel>
							<FormControl>
								<Input
									placeholder="******"
									type="password"
									{...field}
								/>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="confirmPassword"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Confirm Password</FormLabel>
							<FormControl>
								<Input
									placeholder="******"
									type="password"
									{...field}
								/>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>

				{errorMessage && (
					<div className="text-red-600">{errorMessage.message}</div>
				)}

				<Button
					type="submit"
					disabled={isPending}
				>
					Go
				</Button>
			</form>
		</Form>
	)
}
