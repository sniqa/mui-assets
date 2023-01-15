import ArrowBack from '@comps/ArrowBack'
import DialogWraper from '@comps/CustomDialogWraper'
import JoditEditor from '@comps/jodit/JoditEditor'
import { fetchData } from '@lib/fetch'
import { Path } from '@lib/path_map'
import { useChildToParent } from '@lib/utils'
import { Button, TextField } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface DocumentDescript {
	title: string
	description: string
}

const DocumentCreate = () => {
	const [text, setText] = useState('')

	const [openDialog, setOpenDialog] = useState(false)

	const { childHook, parentHook } = useChildToParent<DocumentDescript>()

	const navigate = useNavigate()

	const handleSaveClick = async () => {
		const value = parentHook()

		const document = {
			...value,
			content: text,
			autor: '',
		}

		console.log(document)

		const { create_document } = await fetchData({ create_document: document })

		if (create_document.success) {
			navigate(`${Path.Document}/${create_document.data}`)
		}
	}

	return (
		<div className="h-screen">
			<div className="h-16 px-2 flex justify-between items-center  bg-white">
				<div className="flex items-center">
					<ArrowBack />
					<div className="text-xl ml-2 ">{`创建文档`}</div>
				</div>

				<Button
					variant="outlined"
					onClick={() => setOpenDialog(true)}
				>{`保存`}</Button>
			</div>

			<div className="h-container">
				<JoditEditor defaultValue={''} onSave={(value) => setText(value)} />
			</div>

			<DialogWraper
				title={'保存'}
				open={openDialog}
				onClose={() => setOpenDialog(false)}
				onOk={handleSaveClick}
			>
				<DocumentDetail emitValue={childHook} />
			</DialogWraper>
		</div>
	)
}

export default DocumentCreate

interface DocumentDetailProps {
	emitValue: (cb: () => DocumentDescript) => void
}

const DocumentDetail = ({ emitValue }: DocumentDetailProps) => {
	const [descript, setDescript] = useState({
		title: '',
		description: '',
	})

	emitValue(() => descript)

	return (
		<div className="flex flex-col py-2">
			<TextField
				size="small"
				label={`标题`}
				onChange={(e) =>
					setDescript({ ...descript, title: e.currentTarget.value.trim() })
				}
				sx={{ width: '18rem', mb: '1rem' }}
			/>
			<TextField
				label={`描述`}
				multiline
				minRows={3}
				onChange={(e) =>
					setDescript({
						...descript,
						description: e.currentTarget.value.trim(),
					})
				}
			/>
		</div>
	)
}
