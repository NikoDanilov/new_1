import { AuthLayout } from '@/entities/auth'
import { SettingsForm } from '@/widgets/settings'

function SettingsPage() {
	return (
		<AuthLayout
			title="Profile"
			description="Settings this profile"
			className="max-w-[800px]"
			form={<SettingsForm />}
		/>
	)
}

export const Component = SettingsPage
