import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient()

// INFO: настройки для production

// defaultOptions: {
// 		queries: {
// 			staleTime: 1 * 60 * 1000
// 		}
// 	}
