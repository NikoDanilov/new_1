import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@/shared/ui/kit/dialog'
import type React from 'react'

type ModalType = {
	trigger: React.ReactNode
	title?: React.ReactNode
	content?: React.ReactNode
}

export const Modal = ({ trigger, title, content }: ModalType) => {
	return (
		<Dialog>
			<DialogTrigger>{trigger}</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
					<DialogDescription>{content}</DialogDescription>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	)
}
