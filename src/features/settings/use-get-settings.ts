import { publicRqClient } from '@/shared/api/instance'

export const useGetSettings = () => {
	// const { data } = useQuery({
	// 	queryKey: ['profile'],
	// 	queryFn: () => publicRqClient.useQuery('get', '/profile')
	// })

	const { data } = publicRqClient.useQuery('get', '/profile')

	return { data }
}
