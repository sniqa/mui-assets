import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
} from '@mui/material'

import { memo, ReactNode } from 'react'

export interface DialogWraperProps {
	title: string
	open: boolean
	onClose: () => void
	onOk?: () => void
	children?: ReactNode
	loading?: boolean
}

const DialogWraper = (props: DialogWraperProps) => {
	const { title, open, onClose, onOk = () => {}, children, loading } = props

	return (
		<Dialog open={open} onClose={onClose}>
			<DialogTitle>{title}</DialogTitle>

			<DialogContent className={`w-32rem p-4 flex flex-wrap`}>
				{children}
			</DialogContent>

			<DialogActions>
				<Button onClick={onClose}>{`取消`}</Button>
				<Button
					variant="contained"
					disableElevation
					onClick={onOk}
				>{`确定`}</Button>
			</DialogActions>
		</Dialog>
	)
}

export default memo(DialogWraper)
