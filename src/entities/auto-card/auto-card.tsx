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
		<li className="basis-[48%]">
			<Card>
				<CardHeader className="flex justify-between min-h-6">
					<CardTitle>{car.name}</CardTitle>
					{car.like && <Heart />}
				</CardHeader>
				<CardContent>
					<div className="relative pb-[70%] max-w-full">
						{car?.images?.map((image) => (
							<img
								key={image}
								src={image}
								loading="lazy"
								className="absolute top-0 left-0 right-0 bottom-0 w-full h-full rounded-2xl"
							/>
						))}
					</div>
					<div className="flex flex-col gap-4">
						<div className="text-2xl">{car.price}</div>
						<div>{car.rating}</div>
					</div>
				</CardContent>
				<CardFooter>{actions}</CardFooter>
			</Card>
		</li>
	)
}
