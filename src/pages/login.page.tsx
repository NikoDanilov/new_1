import { AuthLayout } from '@/entities/auth'
import { ROUTES } from '@/shared/model/routes'
import { LoginForm } from '@/widgets/auth'

import { Link } from 'react-router-dom'

function LoginPage() {
	return (
		<AuthLayout
			title="Sign In"
			description="Say hello friend and come in"
			className="max-w-[400px]"
			footer={
				<p>
					No account ?{' '}
					<Link
						to={ROUTES.REGISTER}
						className="font-medium"
					>
						Sign Up!
					</Link>
				</p>
			}
			form={<LoginForm />}
		/>
	)
}

export const Component = LoginPage
