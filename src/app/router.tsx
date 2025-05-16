import { ROUTES } from '@/shared/config/routes'
import { createBrowserRouter } from 'react-router'
import { App } from './app'

export const router = createBrowserRouter([
	{
		element: <App />,
		children: [
			{
				path: ROUTES.HOME,
				lazy: () => import('@/pages/home.page')
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
