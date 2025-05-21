import 'react-router-dom'

export const ROUTES = {
	HOME: '/',
	LOGIN: '/login',
	REGISTER: '/register',
	MACHINE: '/machines/:id'
} as const

export type PathParams = {
	[ROUTES.MACHINE]: {
		id: string
	}
}

declare module 'react-router-dom' {
	interface Register {
		params: PathParams
	}
}
