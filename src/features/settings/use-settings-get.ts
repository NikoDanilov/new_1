import { publicRqClient } from '@/shared/api/instance'

export const useSettingsGet = () => {
	// const { data } = useQuery({
	// 	queryKey: ['profile'],
	// 	queryFn: () => publicRqClient.useQuery('get', '/profile')
	// })

	const { data } = publicRqClient.useQuery('get', '/profile', {
		onSuccess() {
			console.log('123')
		}
	})

	return { data }
}
