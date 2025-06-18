import type { FilterParams, ISearchMediator } from '@/entities/search/mediator'
import { rqClient } from '@/shared/api/instance'
import { keepPreviousData } from '@tanstack/react-query'
import { useCallback, useEffect, useState, type RefCallback } from 'react'

interface UseGetCarsOptions {
	mediator: ISearchMediator
}

export const useGetCars = ({ mediator }: UseGetCarsOptions) => {
	const [filters, setFilters] = useState<FilterParams>({})

	useEffect(() => {
		if (mediator) {
			const unsubscribe = mediator.subscribe((params) => {
				setFilters(params)
			})
			return unsubscribe
		}
	}, [])

	const infiniteCar = rqClient.useInfiniteQuery(
		'get',
		'/machines',
		{
			params: {
				query: {
					limit: 10,
					page: 1,
					minPrice: Number(filters.priceAfter),
					maxPrice: Number(filters.priceBefore)
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
						infiniteCar.fetchNextPage()
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
		[infiniteCar.fetchNextPage]
	)

	return { cursorRef, infiniteCar }
}
