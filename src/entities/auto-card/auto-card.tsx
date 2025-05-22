import type { ApiSchemas } from '@/shared/api/schema'
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle
} from '@/shared/ui/kit/card'
import { Heart } from 'lucide-react'

export const AutoCard = ({
	car,
	actions
}: {
	car: ApiSchemas['Machine']
	actions: React.ReactNode
}) => {
	return (
		<li
			key={car.id}
			className="basis-1/3"
		>
			<Card>
				<CardHeader className="flex justify-between min-h-6">
					<CardTitle>{car.name}</CardTitle>
					{car.like && <Heart />}
				</CardHeader>
				<CardContent>
					<div className="relative pb-80 max-w-full">
						{car?.images?.map((image) => (
							<img
								src={image}
								loading="lazy"
								className="absolute top-0 left-0 right-0 bottom-0 w-full h-full"
							/>
						))}
					</div>
					<div>{car.price}</div>
				</CardContent>
				<CardFooter>{actions}</CardFooter>
			</Card>
		</li>
	)
}
