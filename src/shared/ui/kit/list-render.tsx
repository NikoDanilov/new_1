export const ListRender = <T,>({
	data,
	render
}: {
	data?: T[]
	render: (item: T) => React.ReactNode
}): React.ReactNode => {
	return (
		<ul className="flex flex-wrap gap-8  w-full justify-center ">
			{data?.map((item) => render(item))}
		</ul>
	)
}
