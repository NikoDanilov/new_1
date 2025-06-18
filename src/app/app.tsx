import { DropDownAvatar } from '@/entities/drop-down-avatar'
import { Header } from '@/entities/header'
import { Search } from '@/entities/search'
import { searchMediator } from '@/entities/search/mediator'
import { ROUTES } from '@/shared/model/routes'
import { Button } from '@/shared/ui/kit/button'
import { Logo } from '@/shared/ui/kit/logo'
import { lazy, Suspense, type ComponentType } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { LayoutApp } from './layout'
import { ProtectedComponents } from './protected-route'

const SearchForm = lazy(() =>
	import('@/widgets/search').then((module) => ({
		default: module.SearchForm as ComponentType<{
			mediator: typeof searchMediator
		}>
	}))
)

export const App = () => {
	// TODO: переделать
	const { pathname } = useLocation()
	const isHomePage = pathname === ROUTES.HOME

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
						<Search
							searchForm={
								<Suspense fallback={null}>
									<SearchForm mediator={searchMediator} />
								</Suspense>
							}
						/>
					)}
				</ProtectedComponents>
			}
			main={<Outlet />}
		/>
	)
}
