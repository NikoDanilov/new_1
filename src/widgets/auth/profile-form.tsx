import { publicRqClient } from '@/shared/api/instance'
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
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const schema = z.object({
	email: z
		.string({ required_error: 'Email обязателен' })
		.email('Неверный email'),
	name: z
		.string({ required_error: 'Name обязателен' })
		.min(1, 'Имя обязательно'),
	surname: z
		.string({ required_error: 'Surname обязателен' })
		.min(1, 'Фамилия обязательна'),
	image: z
		.instanceof(File, { message: 'Требуется загрузить изображение' })
		.optional()
})

export const ProfileForm = () => {
	const form = useForm({
		resolver: zodResolver(schema)
	})

	const { isSuccess, data } = publicRqClient.useQuery('get', '/profile')

	useEffect(() => {
		if (isSuccess) {
			form.reset({
				name: data.name || '',
				email: data.email,
				surname: data.surname || ''
			})
		}
	}, [isSuccess, data, form.reset])

	const onSubmit = form.handleSubmit((data) => {
		console.log(data)
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
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Name</FormLabel>
							<FormControl>
								<Input
									placeholder="name"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="surname"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Surname</FormLabel>
							<FormControl>
								<Input
									placeholder="surname"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="image"
					render={({ field: { onChange } }) => (
						<FormItem>
							<FormLabel>Avatar</FormLabel>
							<FormControl>
								<Input
									placeholder="avatar"
									accept="image/*"
									onChange={(e) => {
										onChange(e.target.files?.[0])
									}}
									type="file"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button type="submit">Save</Button>
			</form>
		</Form>
	)
}
