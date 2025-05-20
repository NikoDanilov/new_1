export const Header = ({
	logo,
	actions
}: {
	logo: React.ReactNode
	actions: React.ReactNode
}) => {
	return (
		<header className="fixed top-0 right-0 left-0 bg-white z-10 flex h-16 items-center shadow-lg/10">
			<div className="flex items-center justify-between  max-w-[1600px] w-full mx-auto px-4">
				{logo}
				{actions}
			</div>
		</header>
	)
}
