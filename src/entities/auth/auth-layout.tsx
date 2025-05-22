import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from '@/shared/ui/kit/card'

export const AuthLayout = ({
	title,
	description,
	form,
	footer
}: {
	title: React.ReactNode
	description?: React.ReactNode
	form?: React.ReactNode
	footer?: React.ReactNode
}) => {
	return (
		<div className="flex w-full min-h-screen justify-center items-center">
			<Card className="w-full max-w-[400px]">
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
