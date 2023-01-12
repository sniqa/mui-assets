import CustomDialogWraper from '@comps/CustomDialogWraper'
import CustomTable, { CustomTableProps } from '@comps/CustomTable'
import CustomUpload, { UploadProps } from '@comps/CustomUpload'
import { ReactNode, useCallback, useState } from 'react'

type CustomTable2Props<TData extends Record<string, any> = {}> = Omit<
	CustomTableProps<TData>,
	'onUpload' | 'onEdit'
> & {
	uploadState?: UploadProps
	onEdit?: () => void
	renderCustomDialogContent?: (
		row: TData | null
		// setValue: React.Dispatch<React.SetStateAction<TData | null>>
	) => ReactNode
}

export default function CustomTable2<TData extends Record<string, any> = {}>({
	columns,
	data,
	onDelete,
	onDeleteSeleted,
	onCreate,
	onEdit,
	renderCustomDialogContent,
	uploadState,
}: CustomTable2Props<TData>) {
	const [openUpload, setOpenUpload] = useState(false)
	const [openDialog, setOpenDialog] = useState(false)
	const [currentRow, setCurrentRow] = useState<TData | null>(null)

	const handleCloseUpload = useCallback(() => setOpenUpload(false), [])
	const handleOpenUpload = useCallback(() => setOpenUpload(true), [])
	const handleCloseDialog = useCallback(() => setOpenDialog(false), [])
	const handleOnEdit = useCallback((data: TData) => onEdit && onEdit(), [])

	const handleOnCreate = useCallback(() => {
		setCurrentRow(null)
		setOpenDialog(true)
	}, [])

	const handleOnOk = useCallback(() => {
		console.log('THIS ')

		currentRow ? onEdit && onEdit() : onCreate && onCreate()
		setOpenDialog(false)
	}, [currentRow, onCreate, onEdit])

	return (
		<>
			<CustomTable
				columns={columns}
				data={data}
				onUpload={uploadState && handleOpenUpload}
				onCreate={handleOnCreate}
				onEdit={handleOnEdit}
				rowCustomActionsSize={150}
				onDelete={onDelete}
				onDeleteSeleted={onDeleteSeleted}
			/>

			{uploadState && (
				<CustomUpload
					open={openUpload}
					onCancel={handleCloseUpload}
					{...uploadState}
				/>
			)}

			{renderCustomDialogContent && (
				<CustomDialogWraper
					title={''}
					open={openDialog}
					onClose={handleCloseDialog}
					onOk={handleOnOk}
				>
					{renderCustomDialogContent(currentRow)}
				</CustomDialogWraper>
			)}
		</>
	)
}
