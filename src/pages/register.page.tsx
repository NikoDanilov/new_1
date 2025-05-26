import { AuthLayout } from '@/entities/auth/auth-layout'
import { ROUTES } from '@/shared/model/routes'
import { RegisterForm } from '@/widgets/auth/register-form'
import { Link } from 'react-router-dom'

function RegisterPage() {
	return (
		<AuthLayout
			title="Sign Up"
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
			form={<RegisterForm />}
		/>
	)
}

export const Component = RegisterPage
