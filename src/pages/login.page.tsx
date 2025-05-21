import { AuthLayout } from '@/entities/auth/auth-layout'
import { ROUTES } from '@/shared/model/routes'
import { LoginForm } from '@/widgets/auth/login-form'
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
