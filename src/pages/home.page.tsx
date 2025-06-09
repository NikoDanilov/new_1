import { AutoCard } from '@/entities/auto-card'
import { rqClient } from '@/shared/api/instance'
import { Button } from '@/shared/ui/kit/button'
import { Container } from '@/shared/ui/kit/container'
import { ListRender } from '@/shared/ui/kit/list-render'
import { keepPreviousData } from '@tanstack/react-query'
import { useCallback, type RefCallback } from 'react'

function HomePage() {
	const {
		data: carData,
		isLoading,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage
	} = rqClient.useInfiniteQuery(
		'get',
		'/machines',
		{
			params: {
				query: {
					limit: 10,
					page: 1
				}
			}
		},
		{
			initialPageParam: 1,
			pageParamName: 'page',
			getNextPageParam: (lastPage, _, lastPageParams) =>
				Number(lastPageParams) < lastPage.totalPages
					? Number(lastPageParams) + 1
					: null,
			isPlaceholderData: keepPreviousData,
			select: (result) => result.pages.map((page) => page.list).flat()
		}
	)

	const cursorRef: RefCallback<HTMLDivElement> = useCallback(
		(el) => {
			const observer = new IntersectionObserver(
				(entries) => {
					if (entries[0].isIntersecting) {
						fetchNextPage()
					}
				},
				{ threshold: 0.5 }
			)

			if (el) {
				observer.observe(el)

				return () => {
					observer.disconnect()
				}
			}
		},
		[fetchNextPage]
	)

	if (isLoading) {
		return <div>...Loading</div>
	}
	return (
		<section className="flex pt-8">
			<Container>
				<ListRender
					data={carData}
					render={(item) => (
						<AutoCard
							key={item.id}
							car={item}
							actions={<Button>Delete</Button>}
						/>
					)}
				/>
				{hasNextPage && (
					<div
						ref={cursorRef}
						className="py-4"
					>
						{!hasNextPage && <div>Нет данных</div>}
						{isFetchingNextPage && <div>...Loading</div>}
					</div>
				)}
			</Container>
		</section>
	)
}

export const Component = HomePage
