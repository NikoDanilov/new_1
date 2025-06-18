import { AuthLayout } from '@/entities/auth/auth-layout'
import { ROUTES } from '@/shared/model/routes'
import { RegisterForm } from '@/widgets/auth'

import { Link } from 'react-router-dom'

function RegisterPage() {
	return (
		<AuthLayout
			title="Sign Up"
			description="Say hello friend and come in"
			className="max-w-[400px]"
			footer={
				<p>
					No account ?{' '}
					<Link
						to={ROUTES.LOGIN}
						className="font-medium"
					>
						Sign In!
					</Link>
				</p>
			}
			form={<RegisterForm />}
		/>
	)
}

export const Component = RegisterPage
