import { rqClient } from '@/shared/api/instance'

export const useGetSettings = () => {
	// const { data } = useQuery({
	// 	queryKey: ['profile'],
	// 	queryFn: () => publicRqClient.useQuery('get', '/profile')
	// })

	const { data } = rqClient.useQuery('get', '/profile')

	return { data }
}
