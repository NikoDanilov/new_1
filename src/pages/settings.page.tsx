import { CardLayout } from '@/entities/card'
import { SettingsForm } from '@/widgets/settings/settings-form'

function SettingsPage() {
	return (
		<CardLayout
			title="Profile"
			description="Settings this profile"
			className="max-w-[800px]"
			form={<SettingsForm />}
		/>
	)
}

export const Component = SettingsPage
