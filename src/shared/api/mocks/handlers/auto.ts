import { delay, HttpResponse } from 'msw'
import type { ApiSchemas } from '../../schema'
import { http } from '../http'

const mockMachines: ApiSchemas['Machine'][] = [
	{
		id: '1',
		name: 'Excavator X-2000',
		images: ['https://example.com/images/x2000.jpg'],
		price: 25000.99,
		rating: 4.5,
		like: true,
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString()
	},
	{
		id: '2',
		name: 'Bulldozer B-500',
		images: ['https://example.com/images/b500.jpg'],
		price: 32000.5,
		rating: 4.2,
		like: false,
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString()
	}
]

export const machinesHandlers = [
	http.get('/machines', async () => {
		await delay(300)
		return HttpResponse.json(mockMachines)
	}),

	http.get('/machines/{id}', async ({ params }) => {
		await delay(200)
		const machine = mockMachines.find((m) => m.id === params.id)

		if (!machine) {
			return HttpResponse.json(
				{ message: 'Машина не найдена', code: 'MACHINE_NOT_FOUND' },
				{ status: 404 }
			)
		}

		return HttpResponse.json(machine)
	}),

	http.post('/machines', async ({ request }) => {
		const body = (await request.json()) as ApiSchemas['MachineCreate']
		await delay(400)

		const newMachine: ApiSchemas['Machine'] = {
			id: String(mockMachines.length + 1),
			name: body.name,
			images: body.images || [],
			price: body.price,
			rating: body.rating || 0,
			like: false,
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString()
		}

		mockMachines.push(newMachine)
		return HttpResponse.json(newMachine, { status: 201 })
	}),

	http.put('/machines/{id}', async ({ params, request }) => {
		const body = (await request.json()) as ApiSchemas['MachineUpdate']
		await delay(300)

		const index = mockMachines.findIndex((m) => m.id === params.id)

		if (index === -1) {
			return HttpResponse.json(
				{ message: 'Машина не найдена', code: 'MACHINE_NOT_FOUND' },
				{ status: 404 }
			)
		}

		const updatedMachine = {
			...mockMachines[index],
			...body,
			updatedAt: new Date().toISOString()
		}

		mockMachines[index] = updatedMachine
		return HttpResponse.json(updatedMachine)
	}),

	http.delete('/machines/{id}', async ({ params }) => {
		await delay(200)
		const index = mockMachines.findIndex((m) => m.id === params.id)

		if (index === -1) {
			return HttpResponse.json(
				{ message: 'Машина не найдена', code: 'MACHINE_NOT_FOUND' },
				{ status: 404 }
			)
		}

		mockMachines.splice(index, 1)
		return new HttpResponse(null, { status: 204 })
	}),

	http.patch('/machines/{id}/like', async ({ params }) => {
		await delay(150)
		const machine = mockMachines.find((m) => m.id === params.id)

		if (!machine) {
			return HttpResponse.json(
				{ message: 'Машина не найдена', code: 'MACHINE_NOT_FOUND' },
				{ status: 404 }
			)
		}

		machine.like = !machine.like
		machine.updatedAt = new Date().toISOString()

		return HttpResponse.json({ like: machine.like })
	})
]
