import { ROUTES } from '@/shared/model/routes'
import { Link } from 'react-router-dom'

export const Logo = () => {
	return (
		<Link
			to={ROUTES.HOME}
			className="text-6xl font-bold text-red-600 uppercase italic text-shadow-lg/30"
		>
			IR-C
		</Link>
	)
}
