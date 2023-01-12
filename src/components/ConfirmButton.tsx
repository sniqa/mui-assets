import PopConfirm, { PopConfirmProps } from '@comps/PopConfirm'
import { IconButton, Tooltip, Typography } from '@mui/material'
import { ReactNode } from 'react'

type ConfirmButtonProps = {
	iconTip?: ReactNode
	promptMessage?: string
} & Omit<PopConfirmProps, 'confirmContent'>

const ConfirmButton = ({
	iconTip,
	children,
	promptMessage,
	...prop
}: ConfirmButtonProps) => {
	return (
		<PopConfirm
			{...prop}
			confirmContent={
				<div>
					<Typography className="">提示</Typography>
					<Typography className="py-4">{promptMessage}</Typography>
				</div>
			}
		>
			<Tooltip title={iconTip}>
				<span>
					<IconButton>{children}</IconButton>
				</span>
			</Tooltip>
		</PopConfirm>
	)
}

export default ConfirmButton
