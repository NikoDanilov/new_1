import { DropDownAvatar } from '@/entities/drop-down-avatar/drop-down-avatar'

import { Header } from '@/entities/header'
import { Search } from '@/entities/search'
import { searchMediator } from '@/shared/lib/mediator'
import { ROUTES } from '@/shared/model/routes'
import { Button } from '@/shared/ui/kit/button'
import { Logo } from '@/shared/ui/kit/logo'
import { SearchForm } from '@/widgets/search'
import { Outlet, useLocation } from 'react-router-dom'
import { LayoutApp } from './layout'
import { ProtectedComponents } from './protected-route'

export const App = () => {
	// TODO: переделать
	const location = useLocation()
	const isHomePage = location.pathname === ROUTES.HOME

	return (
		<LayoutApp
			header={
				<ProtectedComponents>
					<Header
						logo={<Logo />}
						avatar={<DropDownAvatar />}
						actions={<Button>Add Car</Button>}
					/>
				</ProtectedComponents>
			}
			search={
				<ProtectedComponents>
					{isHomePage && (
						<Search searchForm={<SearchForm mediator={searchMediator} />} />
					)}
				</ProtectedComponents>
			}
			main={<Outlet />}
		/>
	)
}
