import { enableMocking } from '@/shared/api/mocks'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import './index.css'
import { Providers } from './providers'
import { router } from './router'

enableMocking().then(() => {
	createRoot(document.getElementById('root')!).render(
		<StrictMode>
			<Providers>
				<RouterProvider router={router} />
			</Providers>
		</StrictMode>
	)
})
