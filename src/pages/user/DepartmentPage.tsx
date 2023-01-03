import CustomTable from '@comps/CustomTable'
import CustomUpload from '@comps/CustomUpload'
import { fetchData } from '@lib/fetch'
import { message } from '@lib/MessageContainer'
import { PathMap } from '@lib/path_map'
import { SWRUniqueKey } from '@lib/swrKey'
import type { DepartmentInfo } from '@lib/types'
import { MRT_ColumnDef } from 'material-react-table'
import { useCallback, useState } from 'react'
import useSWR from 'swr'

const columns: MRT_ColumnDef<DepartmentInfo>[] = [
	{
		accessorKey: 'department_name',
		// enableClickToCopy: true,
		header: '部门',
		size: 160,
	},
	{
		accessorKey: 'locations',
		// enableClickToCopy: true,
		header: '物理位置',
		size: 160,
	},
	{
		accessorKey: 'remark',
		// enableClickToCopy: true,
		header: '备注',
		size: 150,
	},
]

// 获取数据
const getData = async () => {
	const { find_tels } = await fetchData({ find_tels: {} })

	const { success, data, errmsg } = find_tels

	return success ? data : (message.error(errmsg), undefined)
}

export default function DepartmentPage() {
	const [openUpload, setOpenUpload] = useState(false)

	const { data } = useSWR(SWRUniqueKey.Department, getData)

	return (
		<>
			<div className="h-16 bg-white mb-4 text-2xl px-4 flex items-center">
				{PathMap.Department}
			</div>

			<div className="px-4">
				<CustomTable<DepartmentInfo>
					columns={columns}
					data={data}
					onUpload={useCallback(() => setOpenUpload(true), [])}
				/>

				<CustomUpload
					open={openUpload}
					onCancel={useCallback(() => setOpenUpload(false), [])}
				/>
			</div>
		</>
	)
}
