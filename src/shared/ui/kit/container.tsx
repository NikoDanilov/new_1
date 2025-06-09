export const Container = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="flex flex-col max-w-[1600px] w-full mx-auto px-4">
			{children}
		</div>
	)
}
