import ConfirmButton from '@comps/ConfirmButton'
import { Delete } from '@mui/icons-material'
import { DropzoneArea } from 'mui-file-dropzone'

const HomePage = () => {
	return (
		<div className="flex justify-center items-center h-screen">
			<ConfirmButton
				onCancel={() => console.log('cancel')}
				onConfirm={() => console.log('confirm')}
				promptMessage={`确定删除？`}
				anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
				transformOrigin={{ vertical: 'bottom', horizontal: 'center' }}
			>
				<Delete />
			</ConfirmButton>

			<DropzoneArea
				fileObjects={{}}
				onChange={(files) => console.log('Files:', files)}
				//  getPreviewIcon={handlePreviewIcon}
			/>

			{/* <DropzoneDialog /> */}
		</div>
	)
}

export default HomePage
