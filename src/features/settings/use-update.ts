import { rqClient } from '@/shared/api/instance'
import type { ApiSchemas } from '@/shared/api/schema'
import { useQueryClient } from '@tanstack/react-query'

export const useUpdateSettings = () => {
	const settingsForm = rqClient.useMutation('patch', '/profile')

	const queryClient = useQueryClient()

	const update = async (data: ApiSchemas['UpdateProfileRequest']) => {
		settingsForm.mutate(
			{ body: data },
			{
				onSuccess() {
					// INFO: делать это по ключу чтобы не перезапрашивал все
					queryClient.invalidateQueries()
				}
			}
		)
	}

	return { update, settingsForm }
}
