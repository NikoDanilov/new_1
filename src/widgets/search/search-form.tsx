import type { ISearchMediator } from '@/entities/search/mediator'
import { Button } from '@/shared/ui/kit/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/shared/ui/kit/form'
import { Input } from '@/shared/ui/kit/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const schema = z.object({
	priceAfter: z.string(),
	priceBefore: z.string()
})

export const SearchForm = ({ mediator }: { mediator: ISearchMediator }) => {
	const form = useForm({
		defaultValues: {
			priceAfter: '0',
			priceBefore: '1000000'
		},
		resolver: zodResolver(schema)
	})

	const onSubmit = form.handleSubmit((data) => {
		mediator &&
			mediator.publish({
				priceAfter: data.priceAfter,
				priceBefore: data.priceBefore
			})
	})

	return (
		<Form {...form}>
			<form
				onSubmit={onSubmit}
				className="flex flex-col bg-white p-4 gap-4"
			>
				<div className="flex flex-col gap-4">
					<h4>Цена</h4>
					<div className="flex flex-col gap-4">
						<FormField
							control={form.control}
							name="priceAfter"
							render={({ field }) => (
								<FormItem className="flex">
									<FormLabel>от</FormLabel>
									<FormControl>
										<Input
											placeholder="0"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="priceBefore"
							render={({ field }) => (
								<FormItem className="flex">
									<FormLabel>до</FormLabel>
									<FormControl>
										<Input
											placeholder="1000000"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
				</div>

				<Button type="submit">Найти</Button>
			</form>
		</Form>
	)
}
