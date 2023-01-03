import ButtomWhitComfirm from '@comps/ButtonWithConfirm'
import { message } from '@lib/MessageContainer'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import DownloadIcon from '@mui/icons-material/Download'
import EditIcon from '@mui/icons-material/Edit'
import UploadIcon from '@mui/icons-material/Upload'
import { IconButton, Tooltip } from '@mui/material'
import { SortingState } from '@tanstack/react-table'
import type { Virtualizer } from '@tanstack/react-virtual'
import { ExportToCsv } from 'export-to-csv'
import MaterialReactTable, {
	MRT_Cell,
	MRT_ColumnDef,
	MRT_Row,
	MRT_TableInstance,
} from 'material-react-table'
import { MRT_Localization_ZH_HANS } from 'material-react-table/locales/zh-Hans'
import {
	memo,
	ReactNode,
	useCallback,
	useEffect,
	useRef,
	useState,
} from 'react'

const TABLE_CONTAINER_HEIGHT = 'calc(100vh - 13rem)'
const SCROLLBAR_CLASSNAME =
	'scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200'

enum TitleTips {
	UploadData = '上传',
	ExportAllData = '导出所有数据',
	ExportSelectedData = '导出选中的数据',
	CreateNewData = '新增',
	DeleteSelectedData = '删除选中的数据',
	EditData = '编辑',
	DeleteData = '删除',
	ActionHeader = '操作',
}

enum ConfirmTips {
	Title = '提示',
	Delete = '确定删除？',
	DeleteSelected = '确定删除选中的项目？',
}

const EXPORT_TO_CSV_TIPS = '导出成功, 请稍后...'

export interface CustomTableProps<TData> {
	columns: MRT_ColumnDef<TData>[]
	data: TData[]
	rowCustomActionsSize?: number
	rowCustomSelectSize?: number
	renderRowCustomActions?: ({
		cell,
		row,
		table,
	}: {
		cell: MRT_Cell<TData>
		row: MRT_Row<TData>
		table: MRT_TableInstance<TData>
	}) => ReactNode
	onUpload?: () => void
	onCreate?: () => void
	onDelete?: (data: TData) => void
	onDeleteSeleted?: (data: TData[]) => void
	onEdit?: (data: TData) => void
}

const CustomTable = <TData extends Record<string, any> = {}>({
	columns,
	data = [],
	rowCustomActionsSize = 30,
	rowCustomSelectSize = 50,
	renderRowCustomActions,
	onUpload,
	onCreate,
	onDelete,
	onDeleteSeleted,
	onEdit,
}: CustomTableProps<TData>) => {
	const rowVirtualizerInstanceRef =
		useRef<Virtualizer<HTMLDivElement, HTMLTableRowElement>>(null)

	const [isLoading, setIsLoading] = useState(true)
	const [sorting, setSorting] = useState<SortingState>([])

	console.log('material-react-table')

	const exportData = useCallback((jsonData: any) => {
		const csvOptions = {
			fieldSeparator: ',',
			quoteStrings: '"',
			decimalSeparator: '.',
			showLabels: true,
			useBom: true,
			useKeysAsHeaders: false,
			headers: columns.map((c) => c.header),
		}

		const csvExporter = new ExportToCsv(csvOptions)

		message.success(EXPORT_TO_CSV_TIPS)

		return csvExporter.generateCsv(jsonData)
	}, [])

	useEffect(() => {
		if (typeof window !== 'undefined') {
			setIsLoading(false)
		}
	}, [])

	useEffect(() => {
		rowVirtualizerInstanceRef.current?.scrollToIndex(0)
	}, [sorting])

	return (
		<>
			<MaterialReactTable
				columns={columns}
				data={data}
				enableRowActions={!!onEdit || !!onDelete || !!renderRowCustomActions}
				enableRowSelection
				enableColumnResizing
				enablePinning
				enableRowVirtualization
				enableDensityToggle={false}
				selectAllMode="all"
				localization={MRT_Localization_ZH_HANS}
				positionActionsColumn="last"
				positionToolbarAlertBanner="bottom"
				onSortingChange={setSorting}
				state={{ isLoading, sorting }}
				rowVirtualizerInstanceRef={rowVirtualizerInstanceRef}
				rowVirtualizerProps={{ overscan: 8 }}
				// muiTableBodyProps={{
				// 	sx: {
				// 		'& tr:nth-of-type(odd)': {
				// 			backgroundColor: '#f5f5f5',
				// 		},
				// 	},
				// }}
				muiTableHeadRowProps={{
					sx: { boxShadow: 0 },
				}}
				muiTablePaperProps={{
					elevation: 0,
					sx: {
						borderRadius: '0.375rem',
						px: '8px',
					},
				}}
				muiTableContainerProps={{
					sx: {
						maxHeight: TABLE_CONTAINER_HEIGHT,
						height: TABLE_CONTAINER_HEIGHT,
					},
					className: `${SCROLLBAR_CLASSNAME}`,
				}}
				initialState={{
					columnPinning: {
						right: ['mrt-row-actions'],
						left: ['mrt-row-select'],
					},
				}}
				displayColumnDefOptions={{
					'mrt-row-actions': {
						header: TitleTips.ActionHeader,
						maxSize: rowCustomActionsSize,
						minSize: rowCustomActionsSize,
						muiTableHeadCellProps: {
							align: 'center',
						},
					},
					'mrt-row-select': {
						maxSize: rowCustomSelectSize,
						minSize: rowCustomSelectSize,
					},
				}}
				renderRowActions={({ table, cell, row }) => (
					<>
						{onEdit && (
							<Tooltip title={TitleTips.EditData}>
								<IconButton onClick={() => onEdit(row.original)}>
									<EditIcon />
								</IconButton>
							</Tooltip>
						)}

						{onDelete && (
							<ButtomWhitComfirm
								title={ConfirmTips.Title}
								description={ConfirmTips.Delete}
								placement="topRight"
								buttonTooltip={TitleTips.DeleteData}
								onConfirm={() => onDelete(row.original)}
							>
								<DeleteIcon />
							</ButtomWhitComfirm>
						)}

						{renderRowCustomActions &&
							renderRowCustomActions({ table, cell, row })}
					</>
				)}
				renderTopToolbarCustomActions={({ table }) => {
					const isRowsSelected =
						!table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()

					return (
						<div className="flex">
							{/* 删除选中的数据 */}
							<ButtomWhitComfirm
								title={ConfirmTips.Title}
								description={ConfirmTips.DeleteSelected}
								placement={`bottomRight`}
								disabled={isRowsSelected}
								buttonTooltip={TitleTips.DeleteSelectedData}
								onConfirm={() =>
									onDeleteSeleted &&
									onDeleteSeleted(
										table.getSelectedRowModel().rows.map((row) => row.original)
									)
								}
							>
								<DeleteIcon />
							</ButtomWhitComfirm>

							{/* 导出选中的数据 */}
							<Tooltip title={TitleTips.ExportSelectedData}>
								<span>
									<IconButton
										disabled={isRowsSelected}
										onClick={() =>
											exportData(
												table
													.getSelectedRowModel()
													.rows.map((row) => row.original)
											)
										}
									>
										<DownloadIcon />
									</IconButton>
								</span>
							</Tooltip>

							{/* 导出所有数据 */}
							<Tooltip title={TitleTips.ExportAllData}>
								<IconButton
									onClick={() =>
										exportData(
											table
												.getPrePaginationRowModel()
												.rows.map((row) => row.original)
										)
									}
								>
									<DownloadIcon />
								</IconButton>
							</Tooltip>

							{/* 上传 */}
							{onUpload && (
								<Tooltip title={TitleTips.UploadData}>
									<IconButton onClick={onUpload}>
										<UploadIcon />
									</IconButton>
								</Tooltip>
							)}

							{/* 新增 */}
							{onCreate && (
								<Tooltip title={TitleTips.CreateNewData}>
									<IconButton onClick={onCreate}>
										<AddIcon />
									</IconButton>
								</Tooltip>
							)}
						</div>
					)
				}}
			/>
		</>
	)
}

export default memo(CustomTable) as <TData>(
	props: CustomTableProps<TData>
) => JSX.Element
