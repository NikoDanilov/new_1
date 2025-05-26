import 'react-router-dom'

export const ROUTES = {
	HOME: '/',
	LOGIN: '/login',
	REGISTER: '/register',
	MACHINE: '/machines/:id',
	SETTINGS: '/settings/:id'
} as const

export type PathParams = {
	[ROUTES.MACHINE]: {
		id: string
	}
	[ROUTES.SETTINGS]: {
		id: string
	}
}

declare module 'react-router-dom' {
	interface Register {
		params: PathParams
	}
}
