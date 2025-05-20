export async function enableMocking() {
	//npx msw init public --save

	if (import.meta.env.PROD) {
		return
	}

	const { worker } = await import('@/shared/api/mocks/browser')
	return worker.start()
}
