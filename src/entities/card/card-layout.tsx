import { cn } from '@/shared/lib/css'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from '@/shared/ui/kit/card'

export const CardLayout = ({
	title,
	description,
	form,
	footer,
	className
}: {
	title: React.ReactNode
	description?: React.ReactNode
	form?: React.ReactNode
	footer?: React.ReactNode
	className?: string
}) => {
	return (
		<div className="flex w-full min-h-screen justify-center items-center">
			<Card className={cn('w-full', className)}>
				<CardHeader>
					<CardTitle>{title}</CardTitle>
					<CardDescription>{description}</CardDescription>
				</CardHeader>
				<CardContent>{form}</CardContent>
				<CardFooter>{footer}</CardFooter>
			</Card>
		</div>
	)
}
