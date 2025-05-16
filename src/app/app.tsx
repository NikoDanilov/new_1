import { Header } from '@/entities/header/header'
import { Outlet } from 'react-router'

export const App = () => {
	return (
		<div>
			<Header />
			<Outlet />
		</div>
	)
}
