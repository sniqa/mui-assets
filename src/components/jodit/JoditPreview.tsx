import JoditWrapper, { Config } from '@comps/jodit/JoditWrapper'

const config: Config = {
	language: 'zh_cn',
	readonly: true,
	buttons: 'selectall,fullsize,print',
	showCharsCounter: false,
	showWordsCounter: false,
	showXPathInStatusbar: false,
}

interface JoditPreviewProps {
	defaultValue: string
}

const JoditPreview = ({ defaultValue }: JoditPreviewProps) => {
	console.log(defaultValue)

	return <JoditWrapper config={config} value={defaultValue} />
}

export default JoditPreview
