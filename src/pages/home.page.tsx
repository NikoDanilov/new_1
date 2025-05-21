import { publicRqClient } from '@/shared/api/instance'
import { ROUTES } from '@/shared/model/routes'
import { Link } from 'react-router-dom'

function HomePage() {
	const { data } = publicRqClient.useQuery('get', '/machines')

	console.log(data)
	return (
		<main className="min-h-screen flex flex-col pt-20">
			<Link to={ROUTES.LOGIN}>tap-tap</Link>
		</main>
	)
}

export const Component = HomePage
