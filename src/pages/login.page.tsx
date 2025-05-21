import { AuthLayout } from '@/entities/auth/auth-layout'
import { LoginForm } from '@/features/auth/login-form'
import { ROUTES } from '@/shared/model/routes'
import { Link } from 'react-router-dom'

function LoginPage() {
	return (
		<AuthLayout
			title="Sign In"
			description="Say hello friend and come in"
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
