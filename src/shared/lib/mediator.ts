export interface ISearchMediator {
	subscribe: (fn: Subscriber) => () => void
	publish: (params: FilterParams) => void
	getCurrentParams: () => FilterParams
}

export type FilterParams = {
	priceAfter?: string
	priceBefore?: string
}

type Subscriber = (params: FilterParams) => void

class SearchMediator implements ISearchMediator {
	private subscribers: Subscriber[] = []
	private currentParams: FilterParams = {}

	subscribe(fn: Subscriber) {
		this.subscribers.push(fn)
		// Immediately notify new subscriber with current state
		fn(this.currentParams)
		return () => {
			this.subscribers = this.subscribers.filter((sub) => sub !== fn)
		}
	}

	publish(params: FilterParams) {
		this.currentParams = { ...this.currentParams, ...params }
		this.subscribers.forEach((fn) => fn(this.currentParams))
	}

	getCurrentParams() {
		return this.currentParams
	}
}

export const searchMediator = new SearchMediator()
