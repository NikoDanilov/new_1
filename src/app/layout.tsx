import React from 'react'

export const LayoutApp = ({
	header,
	search,
	main
}: {
	header?: React.ReactNode
	search?: React.ReactNode
	main: React.ReactNode
}) => {
	return (
		<div className="flex flex-col min-h-screen">
			{header}
			{search}
			<main className="flex flex-col grow">{main}</main>
		</div>
	)
}
