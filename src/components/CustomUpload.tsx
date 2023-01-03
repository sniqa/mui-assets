import { InboxOutlined } from '@ant-design/icons'
import type { UploadProps } from 'antd'
import { Modal, Upload } from 'antd'
import { memo } from 'react'

export type { UploadProps }

const { Dragger } = Upload

type FileUploadProps = {
	open: boolean
	onCancel: () => void
	onOk?: () => void
} & UploadProps

const FileUpload = ({
	open,
	onCancel,
	onOk,
	...uploadState
}: FileUploadProps) => {
	console.log('upload')

	return (
		<Modal open={open} onCancel={onCancel} onOk={onOk} className={`mt-32`}>
			<div className="mt-8">
				<Dragger {...uploadState}>
					<p className="ant-upload-drag-icon">
						<InboxOutlined />
					</p>
					<p className="ant-upload-text">
						Click or drag file to this area to upload
					</p>
					<p className="ant-upload-hint">
						Support for a single or bulk upload. Strictly prohibit from
						uploading company data or other band files
					</p>
				</Dragger>
			</div>
		</Modal>
	)
}
export default memo(FileUpload)
