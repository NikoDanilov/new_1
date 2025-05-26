import { CardLayout } from '@/entities/card'
import { ProfileForm } from '@/widgets/auth/profile-form'

function SettingsPage() {
	return (
		<CardLayout
			title="Profile"
			description="Settings this profile"
			className="max-w-[800px]"
			form={<ProfileForm />}
		/>
	)
}

export const Component = SettingsPage
