export const Header = ({
	logo,
	actions,
	avatar
}: {
	logo: React.ReactNode
	actions?: React.ReactNode
	avatar: React.ReactNode
}) => {
	return (
		<header className="sticky top-0 left-0 right-0 z-30 bg-white  flex flex-col h-16 items-center shadow-lg/10">
			<div className="flex items-center justify-between max-w-[1600px] w-full mx-auto px-4">
				{logo}
				<div className="flex items-center gap-4">
					{actions}
					{avatar}
				</div>
			</div>
		</header>
	)
}
