import JoditEditor, { Config } from '@comps/jodit/JoditWrapper'
import { uploadFile } from '@lib/config'
import { SCROLLBAR_CLASSNAME } from '@lib/constant'
import { useState } from 'react'

const imagesExtensions = ['jpg', 'png', 'jpeg', 'gif', 'svg', 'webp']

interface CustomJoditEditorProps {
	defaultValue: string
	onSave: (value: string) => void
}

// 从URL的文件扩展名判断是文件还是图片
const isFileOrImageFromUrl = (url: string) => {
	const fileExtension = url.split('.').pop()

	if (!fileExtension) return null

	if (imagesExtensions.includes(fileExtension)) {
		return 'image'
	}

	return 'file'
}

const config: Config = {
	language: 'zh_cn',
	toolbarInlineForSelection: true,
	autofocus: true,
	uploader: {
		url: uploadFile,
		imagesExtensions,
		insertImageAsBase64URI: false,
		defaultHandlerSuccess(jodit, res: any) {
			const fileExtension = isFileOrImageFromUrl(res[0])

			if (fileExtension === 'image') {
				jodit.s.insertImage(res[0])
			}

			if (fileExtension === 'file') {
				const element = document.createElement('a')
				element.href = res[0]
				element.target = '_blank'
				element.text = '下载链接'

				jodit.s.focus()
				jodit.s.insertHTML(element.outerHTML)
			}
		},
	},
}

const CustomJoditEditor = ({
	defaultValue,
	onSave,
}: CustomJoditEditorProps) => {
	const [content, setContent] = useState('')

	return (
		<JoditEditor
			value={defaultValue}
			config={config}
			className={`rounded-xl box-border  overflow-auto ${SCROLLBAR_CLASSNAME}`}
			onBlur={(value) => {
				onSave && onSave(value)
			}}
		/>
	)
}

export default CustomJoditEditor
