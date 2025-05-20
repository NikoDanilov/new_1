import { ROUTES } from '@/shared/model/routes'
import { Link } from 'react-router-dom'

function HomePage() {
	return (
		<main className="min-h-screen flex flex-col pt-20">
			<Link to={ROUTES.LOGIN}>tap-tap</Link>
		</main>
	)
}

export const Component = HomePage
