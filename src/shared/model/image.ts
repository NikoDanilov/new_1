export const convertFileToBase64 = (file: File): Promise<string> => {
	return new Promise((resolve) => {
		const reader = new FileReader()
		reader.readAsDataURL(file)
		reader.onload = () => resolve(reader.result as string)
	})
}

export const getPreviewUrl = (file: File | string | null | undefined) => {
	if (!file) return undefined
	return typeof file === 'string' ? file : URL.createObjectURL(file)
}
