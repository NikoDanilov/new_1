import { AutoCard } from '@/entities/auto-card/auto-card'

import { publicRqClient } from '@/shared/api/instance'
import { Button } from '@/shared/ui/kit/button'
import { Container } from '@/shared/ui/kit/container'
import { ListRender } from '@/shared/ui/kit/list-render'

function HomePage() {
	const { data, isPending } = publicRqClient.useQuery('get', '/machines')

	if (isPending) {
		return <div>...Loading</div>
	}
	return (
		<section className="flex pt-8">
			<Container>
				<ListRender
					data={data}
					render={(item) => (
						<AutoCard
							key={item.id}
							car={item}
							actions={<Button>Delete</Button>}
						/>
					)}
				/>
			</Container>
		</section>
	)
}

export const Component = HomePage
