import { delay, HttpResponse } from 'msw'
import type { ApiSchemas } from '../../schema'
import { http } from '../http'
import {
	createRefreshTokenCookie,
	generateTokens,
	verifyToken
} from '../session.ts'

// const mockUsers: ApiSchemas['User'][] = [
// 	{
// 		id: '1',
// 		email: 'admin@gmail.com'
// 	}
// ]

const mockUsers: ApiSchemas['User'][] = [
	{
		id: '1',
		email: 'admin@gmail.com',
		name: 'Admin',
		surname: 'Super',
		image: 'https://example.com/admin.jpg',
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString()
	}
]

const userPasswords = new Map<string, string>()
userPasswords.set('admin@gmail.com', '1')

export const authHandlers = [
	http.post('/auth/login', async ({ request }) => {
		const body = await request.json()

		const user = mockUsers.find((u) => u.email === body.email)
		const storedPassword = userPasswords.get(body.email)

		await delay()

		if (!user || !storedPassword || storedPassword !== body.password) {
			return HttpResponse.json(
				{
					message: 'Неверный email или пароль',
					code: 'INVALID_CREDENTIALS'
				},
				{ status: 401 }
			)
		}

		const { accessToken, refreshToken } = await generateTokens({
			userId: user.id,
			email: user.email
		})

		return HttpResponse.json(
			{
				accessToken: accessToken,
				user
			},
			{
				status: 200,
				headers: {
					'Set-Cookie': createRefreshTokenCookie(refreshToken)
				}
			}
		)
	}),

	http.post('/auth/register', async ({ request }) => {
		const body = await request.json()

		await delay()

		if (mockUsers.some((u) => u.email === body.email)) {
			return HttpResponse.json(
				{
					message: 'Пользователь уже существует',
					code: 'USER_EXISTS'
				},
				{ status: 400 }
			)
		}

		const newUser: ApiSchemas['User'] = {
			id: String(mockUsers.length + 1),
			email: body.email
		}

		const { accessToken, refreshToken } = await generateTokens({
			userId: newUser.id,
			email: newUser.email
		})

		mockUsers.push(newUser)
		userPasswords.set(body.email, body.password)

		return HttpResponse.json(
			{
				accessToken: accessToken,
				user: newUser
			},
			{
				status: 201,
				headers: {
					'Set-Cookie': createRefreshTokenCookie(refreshToken)
				}
			}
		)
	}),
	http.post('/auth/refresh', async ({ cookies }) => {
		const refreshToken = cookies.refreshToken

		if (!refreshToken) {
			return HttpResponse.json(
				{
					message: 'Refresh token не найден',
					code: 'REFRESH_TOKEN_MISSING'
				},
				{ status: 401 }
			)
		}

		try {
			const session = await verifyToken(refreshToken)
			const user = mockUsers.find((u) => u.id === session.userId)

			if (!user) {
				throw new Error('User not found')
			}

			const { accessToken, refreshToken: newRefreshToken } =
				await generateTokens({
					userId: user.id,
					email: user.email
				})

			return HttpResponse.json(
				{
					accessToken,
					user
				},
				{
					status: 200,
					headers: {
						'Set-Cookie': createRefreshTokenCookie(newRefreshToken)
					}
				}
			)
		} catch (error) {
			console.error('Error refreshing token:', error)
			return HttpResponse.json(
				{
					message: 'Недействительный refresh token',
					code: 'INVALID_REFRESH_TOKEN'
				},
				{ status: 401 }
			)
		}
	}),
	http.get('/profile', async ({ cookies }) => {
		const accessToken = cookies.refreshToken

		if (!accessToken) {
			return HttpResponse.json(
				{ message: 'Требуется авторизация', code: 'UNAUTHORIZED' },
				{ status: 401 }
			)
		}

		try {
			const session = await verifyToken(accessToken)
			const user = mockUsers.find((u) => u.id === session.userId)

			if (!user) {
				throw new Error('User not found')
			}

			await delay(500) // Имитация задержки сети

			return HttpResponse.json(user, { status: 200 })
		} catch (error) {
			return HttpResponse.json(
				{ message: 'Недействительный токен', code: 'INVALID_TOKEN' },
				{ status: 401 }
			)
		}
	}),
	http.patch('/profile', async ({ request, cookies }) => {
		const accessToken = cookies.accessToken
		const body = await request.json()

		if (!accessToken) {
			return HttpResponse.json(
				{ message: 'Требуется авторизация', code: 'UNAUTHORIZED' },
				{ status: 401 }
			)
		}

		try {
			const session = await verifyToken(accessToken)
			const user = mockUsers.find((u) => u.id === session.userId)

			if (!user) {
				throw new Error('User not found')
			}

			// Валидация текущего пароля (если меняется email или пароль)
			if (
				(body.email || body.newPassword) &&
				userPasswords.get(user.email) !== body.currentPassword
			) {
				return HttpResponse.json(
					{ message: 'Неверный текущий пароль', code: 'INVALID_PASSWORD' },
					{ status: 400 }
				)
			}

			// Обновляем поля
			if (body.email) user.email = body.email
			if (body.name) user.name = body.name
			if (body.surname) user.surname = body.surname
			if (body.image) user.image = body.image
			if (body.newPassword) userPasswords.set(user.email, body.newPassword)

			user.updatedAt = new Date().toISOString()

			await delay(800) // Имитация задержки

			return HttpResponse.json(user, { status: 200 })
		} catch (error) {
			return HttpResponse.json(
				{ message: 'Ошибка обновления', code: 'UPDATE_FAILED' },
				{ status: 400 }
			)
		}
	})
]
