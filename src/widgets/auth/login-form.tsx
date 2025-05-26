import { useLogin } from '@/features/auth/use-login'
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

const schema = z.object({
	email: z
		.string({ required_error: 'Email обязателен' })
		.email('Неверный email'),
	password: z
		.string({ required_error: 'Пароль обязателен' })
		.min(1, 'Пароль должен быть не менее 6 символов')
})

export const LoginForm = () => {
	const form = useForm({
		defaultValues: {
			email: '',
			password: ''
		},
		resolver: zodResolver(schema)
	})

	const { errorMessage, isPending, login } = useLogin()

	const onSubmit = form.handleSubmit((data) => {
		login(data)
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
