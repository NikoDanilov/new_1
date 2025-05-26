import React from 'react'

export const LayoutApp = ({
	header,
	main
}: {
	header?: React.ReactNode
	main: React.ReactNode
}) => {
	return (
		<div className="flex flex-col min-h-screen">
			{header}
			<main className="flex flex-col grow">{main}</main>
		</div>
	)
}
