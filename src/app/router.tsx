import { ROUTES } from '@/shared/model/routes'
import { createBrowserRouter } from 'react-router-dom'
import { App } from './app'
import { protectedLoader, ProtectedRoute } from './protected-route'

// TODO: решить проблему с роутом

export const router = createBrowserRouter([
	{
		element: <App />,
		children: [
			{
				loader: protectedLoader,
				element: <ProtectedRoute />,
				children: [
					{
						path: ROUTES.HOME,
						lazy: () => import('@/pages/home.page')
					},
					{
						path: ROUTES.SETTINGS,
						lazy: () => import('@/pages/settings.page')
					}
				]
			},
			{
				path: ROUTES.LOGIN,
				lazy: () => import('@/pages/login.page')
			},
			{
				path: ROUTES.REGISTER,
				lazy: () => import('@/pages/register.page')
			}
		]
	}
])
