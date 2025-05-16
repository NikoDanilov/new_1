import { ROUTES } from '@/shared/config/routes'
import { Link } from 'react-router'

function HomePage() {
	return (
		<div>
			HomePage
			<Link to={ROUTES.LOGIN}>tap-tap</Link>
		</div>
	)
}

export const Component = HomePage
