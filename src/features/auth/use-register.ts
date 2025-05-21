import { publicRqClient } from '@/shared/api/instance'
import type { ApiSchemas } from '@/shared/api/schema'
import { ROUTES } from '@/shared/model/routes'
import { useNavigate } from 'react-router-dom'

export const useRegister = () => {
	const navigate = useNavigate()

	const registerForm = publicRqClient.useMutation('post', '/auth/register', {
		onSuccess() {
			navigate(ROUTES.LOGIN)
		}
	})

	const register = (data: ApiSchemas['RegisterRequest']) => {
		registerForm.mutate({ body: data })
	}

	const errorMessage = registerForm.isError ? registerForm.error : undefined

	return {
		register,
		errorMessage,
		isPending: registerForm.isPending
	}
}
