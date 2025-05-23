import { useSession } from '@/shared/model/session'
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/kit/avatar'
import { Button } from '@/shared/ui/kit/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from '@/shared/ui/kit/dropdown-menu'

// TODO: переделать
export const ProfileAvatar = () => {
	const { session } = useSession()
	// TODO: Добавить img к профилю
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost">
					<Avatar>
						<AvatarImage src="картинка" />
						<AvatarFallback>CN</AvatarFallback>
					</Avatar>
					{session?.email}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56 mr-9">
				<DropdownMenuItem>Settings</DropdownMenuItem>
				<DropdownMenuItem>Log out</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
