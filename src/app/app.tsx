import { DropDownAvatar } from '@/entities/drop-down-avatar/drop-down-avatar'
import { Header } from '@/entities/header/header'
import { Logo } from '@/shared/ui/kit/logo'
import { Outlet } from 'react-router-dom'
import { LayoutApp } from './layout'
import { ProtectedComponents } from './protected-route'

export const App = () => {
	return (
		<LayoutApp
			header={
				<ProtectedComponents>
					<Header
						logo={<Logo />}
						avatar={<DropDownAvatar />}
					/>
				</ProtectedComponents>
			}
			main={<Outlet />}
		/>
	)
}
