import { SCROLLBAR_CLASSNAME } from '@lib/constant'
import { Jodit } from 'jodit'
import 'jodit/build/jodit.min.css'
import type { IUploaderData } from 'jodit/types'
import { memo, useCallback, useEffect, useRef } from 'react'

export type Config = Partial<Omit<Jodit['options'], 'uploader'>> & {
	uploader?: {
		url: string
		imagesExtensions: string[]
		insertImageAsBase64URI: boolean
		defaultHandlerSuccess: (jodit: Jodit, response: IUploaderData) => any
	}
}

interface JoditEditorProps {
	value?: string
	className?: string
	config: Config
	onBlur?: (value: string) => void
	onChange?: (value: string) => void
}

const JoditEditor = ({
	value = '',
	className = '',
	config,
	onBlur,
	onChange,
}: JoditEditorProps) => {
	const editorRef = useRef<HTMLTextAreaElement | null>(null)

	console.log('jodit')

	const onChangeHandler = useCallback((value: string) => {
		onChange && onChange(value)
	}, [])

	const onBlurHandler = useCallback(() => {
		onBlur && onBlur(editorRef.current?.value.trim() || '')
	}, [])

	useEffect(() => {
		if (editorRef.current === null) {
			return
		}
		const jodit = Jodit.make(editorRef.current, config)

		jodit.options.uploader.defaultHandlerSuccess = (response) =>
			config?.uploader &&
			config?.uploader.defaultHandlerSuccess(jodit, response)

		jodit.value = value

		jodit.events.on('blur', onBlurHandler)
		jodit.events.on('change', onChangeHandler)

		return () => {
			jodit.events.off('blur', onBlurHandler)
			jodit.events.off('change', onChangeHandler)
			jodit && jodit.destruct()
		}
	}, [value])

	return (
		<div
			className={`p-2 rounded-xl box-border h-full overflow-auto ${SCROLLBAR_CLASSNAME} ${className}`}
		>
			<textarea id="jodit-editor" ref={editorRef} />
		</div>
	)
}

export default memo(JoditEditor)
