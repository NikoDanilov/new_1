import { publicRqClient } from '@/shared/api/instance'

export const Header = ({
	logo,
	actions,
	avatar
}: {
	logo: React.ReactNode
	actions?: React.ReactNode
	avatar: React.ReactNode
}) => {
	const data = publicRqClient.useQuery('get', '/profile')

	console.log(data.data)
	return (
		<header className="sticky top-0 left-0 right-0 bg-white z-10 flex h-16 items-center shadow-lg/10">
			<div className="flex items-center justify-between  max-w-[1600px] w-full mx-auto px-4">
				{logo}
				{actions}
				{avatar}
			</div>
		</header>
	)
}
