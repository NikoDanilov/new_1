import { enableMocking } from '@/shared/api/mocks'
import { ROUTES } from '@/shared/model/routes'
import { useSession } from '@/shared/model/session'
import { Navigate, Outlet, redirect } from 'react-router-dom'

export function ProtectedRoute() {
	const { session } = useSession()

	if (!session) {
		return <Navigate to={ROUTES.LOGIN} />
	}

	return <Outlet />
}

export async function protectedLoader() {
	await enableMocking()

	const token = await useSession.getState().refreshToken()

	if (!token) {
		return redirect(ROUTES.LOGIN)
	}

	return null
}

export function ProtectedComponents({
	children
}: {
	children: React.ReactNode
}) {
	const { session } = useSession()

	console.log('render ProtectedComponents')

	if (!session) {
		return null
	}

	return children
}
