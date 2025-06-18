import { Button } from '@/shared/ui/kit/button'
import { animated, useSpring } from '@react-spring/web'
import { ArrowBigDown, ArrowBigUp } from 'lucide-react'
import { useState } from 'react'

export const Search = ({ searchForm }: { searchForm: React.ReactNode }) => {
	const [springs, api] = useSpring(() => ({
		from: { y: 0 }
	}))

	const [open, setOpen] = useState(false)

	const handleToggleSearch = () => {
		setOpen((prev) => !prev)
		api.start({
			from: {
				y: 10
			},
			to: {
				y: 0
			}
		})
	}

	return (
		<animated.div
			className="fixed top-16 left-0 z-20 w-full flex flex-col"
			style={springs}
		>
			{open && searchForm}
			<Button
				onClick={handleToggleSearch}
				variant="outline"
				className="flex flex-col gap-0"
			>
				Поиск {open ? <ArrowBigUp /> : <ArrowBigDown />}
			</Button>
		</animated.div>
	)
}

export default Search
