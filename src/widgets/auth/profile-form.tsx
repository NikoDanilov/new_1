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
import { useLayoutEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const schema = z.object({
	name: z
		.string({ required_error: 'Name обязателен' })
		.min(1, 'Имя обязательно'),
	surname: z
		.string({ required_error: 'Surname обязателен' })
		.min(1, 'Фамилия обязательна'),
	// image: z.string().url().optional()
	image: z.union([z.instanceof(File), z.string().url(), z.null()]).optional()
})

export const ProfileForm = () => {
	const { data, refetch } = publicRqClient.useQuery('get', '/profile')
	const FormMutate = publicRqClient.useMutation('patch', '/profile')

	const form = useForm({
		resolver: zodResolver(schema)
	})

	// INFO: жертвуем onSuccess так как его нету
	// FIXME: избегать useEffect/useLayoutEffect

	useLayoutEffect(() => {
		if (data) {
			form.reset({
				name: data.name || '',
				surname: data.surname || '',
				image: data.image || null
			})
		}
	}, [data, form])

	const onSubmit = form.handleSubmit(async (data) => {
		const jsonData = {
			name: data.name,
			surname: data.surname,
			image:
				data.image instanceof File
					? await convertFileToBase64(data.image)
					: data.image
		}

		FormMutate.mutate({ body: jsonData })
		refetch()
	})

	// Вспомогательная функция
	const convertFileToBase64 = (file: File): Promise<string> => {
		return new Promise((resolve) => {
			const reader = new FileReader()
			reader.readAsDataURL(file)
			reader.onload = () => resolve(reader.result as string)
		})
	}

	const getPreviewUrl = (file: File | string | null | undefined) => {
		if (!file) return undefined
		return typeof file === 'string' ? file : URL.createObjectURL(file)
	}

	return (
		<Form {...form}>
			<form
				onSubmit={onSubmit}
				className="flex flex-col gap-4"
			>
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
					render={({ field: { onChange, value } }) => (
						<FormItem>
							<FormLabel>Avatar</FormLabel>
							<FormControl>
								<Input
									placeholder="avatar"
									accept="image/*"
									onChange={(e) => {
										onChange(e.target.files?.[0] || null)
									}}
									type="file"
								/>
							</FormControl>
							{value && (
								<div className="mt-2">
									<img
										src={getPreviewUrl(value)}
										alt="Current avatar"
										className="h-20 w-20 rounded-full"
									/>
								</div>
							)}
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button type="submit">Save</Button>
			</form>
		</Form>
	)
}
