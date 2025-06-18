import { AutoCard } from '@/entities/auto-card'
import { searchMediator } from '@/entities/search/mediator'
import { useGetCars } from '@/features/home'
import { Button } from '@/shared/ui/kit/button'
import { Container } from '@/shared/ui/kit/container'
import { ListRender } from '@/shared/ui/kit/list-render'

function HomePage() {
	const { cursorRef, infiniteCar } = useGetCars({ mediator: searchMediator })

	if (infiniteCar.isLoading) {
		return <div>...Loading</div>
	}
	return (
		<section className="flex pt-12">
			<Container>
				<ListRender
					data={infiniteCar.data}
					render={(item) => (
						<AutoCard
							key={item.id}
							car={item}
							actions={<Button>Delete</Button>}
						/>
					)}
				/>
				{infiniteCar.hasNextPage && (
					<div
						ref={cursorRef}
						className="py-4"
					>
						{!infiniteCar.hasNextPage && <div>Нет данных</div>}
						{infiniteCar.isFetchingNextPage && <div>...Loading</div>}
					</div>
				)}
			</Container>
		</section>
	)
}

export const Component = HomePage
