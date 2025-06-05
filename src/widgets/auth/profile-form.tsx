import { useSettingsGet } from '@/features/settings/use-settings-get'
import { useSettingsUpdate } from '@/features/settings/use-settings-update'
import { convertFileToBase64, getPreviewUrl } from '@/shared/model/image'
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
	name: z
		.string({ required_error: 'Name обязателен' })
		.min(1, 'Имя обязательно'),
	surname: z
		.string({ required_error: 'Surname обязателен' })
		.min(1, 'Фамилия обязательна'),
	image: z.union([z.instanceof(File), z.string().url(), z.null()]).optional()
})

export const ProfileForm = () => {
	const { data: profileData } = useSettingsGet()
	const { update, settingsForm } = useSettingsUpdate()

	const form = useForm({
		resolver: zodResolver(schema),
		defaultValues: {
			name: profileData?.name || '',
			surname: profileData?.surname || '',
			image: profileData?.image || null
		}
	})

	const onSubmit = form.handleSubmit(async (data) => {
		const jsonData = {
			name: data.name,
			surname: data.surname,
			image:
				data.image instanceof File
					? await convertFileToBase64(data.image).catch(() => null)
					: data.image
		}
		update(jsonData)
	})

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

				<Button
					disabled={settingsForm.isPending}
					type="submit"
				>
					Save
				</Button>
			</form>
		</Form>
	)
}
