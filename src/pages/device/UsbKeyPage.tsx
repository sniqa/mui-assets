import CustomTable from '@comps/CustomTable'
import CustomUpload from '@comps/CustomUpload'
import { fetchData } from '@lib/fetch'
import { message } from '@lib/MessageContainer'
import { PathMap } from '@lib/path_map'
import { SWRUniqueKey } from '@lib/swrKey'
import type { UsbKeyInfo } from '@lib/types'
import { MRT_ColumnDef } from 'material-react-table'
import { useCallback, useState } from 'react'
import useSWR from 'swr'

const columns: MRT_ColumnDef<UsbKeyInfo>[] = [
	{
		accessorKey: 'number',
		enableClickToCopy: true,
		header: '证书编号',
		size: 150,
	},
	{
		accessorKey: 'user',
		enableClickToCopy: true,
		header: '使用人',
		size: 150,
	},
	{
		accessorKey: 'enable_time',
		enableClickToCopy: true,
		header: '启用时间',
		size: 150,
	},
	{
		accessorKey: 'collection_time',
		enableClickToCopy: true,
		header: '领用时间',
		size: 150,
	},
	{
		accessorKey: 'return_time',
		enableClickToCopy: true,
		header: '归还时间',
		size: 150,
	},
	{
		accessorKey: 'remark',
		enableClickToCopy: true,
		header: '备注',
		size: 150,
	},
]

// 获取数据
const getData = async () => {
	const { find_use_keys } = await fetchData({
		find_use_keys: {},
	})

	console.log(find_use_keys)

	const { success, data, errmsg } = find_use_keys

	return success ? data : (message.error(errmsg), undefined)
}

export default function UsbKeyPage() {
	const [openUpload, setOpenUpload] = useState(false)

	const handleCloseUpload = useCallback(() => setOpenUpload(false), [])

	const handleOpenUpload = useCallback(() => setOpenUpload(true), [])

	const { data } = useSWR(SWRUniqueKey, getData)

	return (
		<>
			<div className="h-16 bg-white mb-4 text-2xl px-4 flex items-center">
				{PathMap.Usb_key}
			</div>

			<div className="px-4">
				<CustomTable<UsbKeyInfo>
					columns={columns}
					data={data}
					onUpload={handleOpenUpload}
				/>

				<CustomUpload open={openUpload} onCancel={handleCloseUpload} />
			</div>
		</>
	)
}
