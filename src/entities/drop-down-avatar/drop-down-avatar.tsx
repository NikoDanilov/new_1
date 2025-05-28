import { publicRqClient } from '@/shared/api/instance'
import { ROUTES } from '@/shared/model/routes'
import { useSession } from '@/shared/model/session'
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/kit/avatar'
import { Button } from '@/shared/ui/kit/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuTrigger
} from '@/shared/ui/kit/dropdown-menu'
import { href, Link } from 'react-router-dom'

// TODO: переделать
export const DropDownAvatar = () => {
	const { data: user } = publicRqClient.useQuery('get', '/profile')

	const { logout } = useSession()

	const getPreviewUrl = (file: File | string | null | undefined) => {
		if (!file) return undefined
		return typeof file === 'string' ? file : URL.createObjectURL(file)
	}

	if (!user) {
		return null
	}
	// TODO: Добавить img к профилю
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost">
					<Avatar>
						<AvatarImage src={getPreviewUrl(user.image)} />
						<AvatarFallback>CN</AvatarFallback>
					</Avatar>
					{user.email}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56 mr-9">
				<DropdownMenuGroup>
					<Link
						to={href(ROUTES.SETTINGS, {
							id: user.id
						})}
						className="w-full"
					>
						<DropdownMenuItem> Settings</DropdownMenuItem>
					</Link>
					<DropdownMenuItem onClick={() => logout()}>Log out</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
