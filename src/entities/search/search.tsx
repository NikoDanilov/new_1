import { Button } from '@/shared/ui/kit/button'
import { useState } from 'react'

export const Search = ({ searchForm }: { searchForm: React.ReactNode }) => {
	const [open, setOpen] = useState(false)

	const handleToggleSearch = () => {
		setOpen((prev) => !prev)
	}

	return (
		<div className="fixed top-16 left-0 z-20 w-full flex flex-col">
			{open && searchForm}
			<Button
				onClick={handleToggleSearch}
				variant="outline"
			>
				Поиск
			</Button>
		</div>
	)
}
