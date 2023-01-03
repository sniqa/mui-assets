import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import { Popconfirm } from 'antd'
import { RenderFunction, TooltipPlacement } from 'antd/es/tooltip'
import { memo, ReactNode, useState } from 'react'

interface ButtomWhitComfirmProps {
	title: string
	buttonTooltip?: ReactNode
	description?: ReactNode | RenderFunction
	placement?: TooltipPlacement
	onConfirm?: (
		e?: React.MouseEvent<HTMLElement, MouseEvent> | undefined
	) => void
	children?: ReactNode
	disabled?: boolean
}

const ButtomWhitComfirm = memo(
	({
		title,
		description,
		buttonTooltip,
		placement,
		onConfirm,
		children,
		disabled,
	}: ButtomWhitComfirmProps) => {
		const [deleteConfirm, setDeleteConfirm] = useState(false)

		return (
			<Popconfirm
				description={description}
				title={title}
				placement={placement}
				open={deleteConfirm}
				onCancel={() => setDeleteConfirm(false)}
				onConfirm={() => {
					setDeleteConfirm(false)
					onConfirm && onConfirm()
				}}
			>
				<Tooltip title={buttonTooltip}>
					<span>
						<IconButton
							disabled={disabled}
							onClick={() => setDeleteConfirm(true)}
						>
							{children}
						</IconButton>
					</span>
				</Tooltip>
			</Popconfirm>
		)
	}
)

export default ButtomWhitComfirm
