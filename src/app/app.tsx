import { Header } from '@/entities/header/header'
import { useSession } from '@/shared/model/session'
import { Button } from '@/shared/ui/kit/button'
import { Logo } from '@/shared/ui/kit/logo'
import { Outlet } from 'react-router-dom'
import { Providers } from './providers'

export const App = () => {
	const { session } = useSession()

	return (
		<Providers>
			<div className="flex flex-col">
				{session && (
					<Header
						logo={<Logo />}
						actions={<Button>Exit</Button>}
					/>
				)}
				<Outlet />
			</div>
		</Providers>
	)
}
