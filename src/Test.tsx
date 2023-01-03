import CustomTable from '@comps/CustomTable'
// import FileUpload, { UploadProps } from '@comps/FileUpload'
import FileUpload, { UploadProps } from '@comps/CustomUpload'
import { Dialog } from '@mui/material'
import { MRT_ColumnDef } from 'material-react-table'
import { useCallback, useMemo, useState } from 'react'
import { message } from './lib/MessageContainer'

interface Person {
	firstname: string
	lastname: string
}

const columns: MRT_ColumnDef<Person>[] = [
	{ accessorKey: 'firstname', header: 'firstname' },
	{ accessorKey: 'lastname', header: 'lastname' },
]

const data = Array.from({ length: 1000 }, (_, i) => ({
	firstname: `firstname: ${i}`,
	lastname: `${i}`,
}))

export default function App() {
	const [openUploadDialog, setOpenUploadDialog] = useState(false)

	const [openDialog, setOpenDialog] = useState(false)

	// const [messageApi, contextHolder] = message.useMessage()

	const uploadState: UploadProps = useMemo(
		() => ({
			name: 'file',
			multiple: true,
			action: 'http://localhost:8083/upload/device',
		}),
		[]
	)

	return (
		<>
			{/* {contextHolder} */}

			<CustomTable<Person>
				columns={columns}
				data={data}
				onUpload={useCallback(() => setOpenUploadDialog(true), [])}
				onCreate={useCallback(() => setOpenDialog(true), [])}
				onDelete={useCallback(
					(data: Person) => (console.log(data), message.success('hello world')),
					[]
				)}
				onEdit={useCallback((data: Person) => console.log(data), [])}
				onDeleteSeleted={useCallback((data: Person[]) => console.log(data), [])}
			/>

			<FileUpload
				open={openUploadDialog}
				onCancel={useCallback(() => setOpenUploadDialog(false), [])}
				{...uploadState}
			/>

			<Dialog
				open={openDialog}
				// onClose={useCallback(() => setOpenDialog(false), [])}
				onClose={useCallback(() => setOpenDialog(false), [])}
			>
				<DialogContent />
			</Dialog>
		</>
	)
}

const DialogContent = () => {
	console.log('dialogContent')

	return <div className="">DialogContent</div>
}
