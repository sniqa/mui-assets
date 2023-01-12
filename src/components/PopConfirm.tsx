import { Button, Popover, PopoverOrigin } from '@mui/material'
import { ReactNode, useCallback, useRef, useState } from 'react'

export interface PopConfirmProps {
	confirmContent?: ReactNode
	children: ReactNode
	anchorOrigin?: PopoverOrigin
	transformOrigin?: PopoverOrigin
	onCancel?: () => void
	onConfirm?: () => void
}

const origin: PopoverOrigin = { vertical: 'top', horizontal: 'center' }

const PopConfirm = ({
	confirmContent = <div></div>,
	children,
	anchorOrigin = origin,
	transformOrigin = origin,
	onCancel,
	onConfirm,
}: PopConfirmProps) => {
	const [open, setOpen] = useState(false)

	const ref = useRef(null)

	const handleOnCancel = useCallback(() => {
		setOpen(false)
		onCancel && onCancel()
	}, [])

	const handleOnConfirm = useCallback(() => {
		setOpen(false)
		onConfirm && onConfirm()
	}, [])

	const handleCloseConfirm = useCallback(() => setOpen(true), [])

	return (
		<>
			<div className="" ref={ref} onClick={handleCloseConfirm}>
				{children}
			</div>

			<Popover
				open={open}
				anchorEl={ref.current}
				elevation={0}
				anchorOrigin={anchorOrigin}
				transformOrigin={transformOrigin}
			>
				<div className="px-4 py-4 rounded-xl dark:bg-gray-800">
					{confirmContent}

					<div className="flex justify-end ">
						<Button
							size="small"
							variant="outlined"
							onClick={handleOnCancel}
							className="dark:!text-gray-200 dark:!border-gray-200 dark:hover:!text-gray-50 dark:hover:!border-gray-50"
						>{`取消`}</Button>
						<Button
							size="small"
							variant="contained"
							disableElevation
							sx={{ ml: '8px' }}
							onClick={handleOnConfirm}
						>{`确定`}</Button>
					</div>
				</div>
			</Popover>
		</>
	)
}

export default PopConfirm
