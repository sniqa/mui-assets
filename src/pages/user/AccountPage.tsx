import CustomTable from '@comps/CustomTable'
import CustomUpload from '@comps/CustomUpload'
import { fetchData } from '@lib/fetch'
import { message } from '@lib/MessageContainer'
import { PathMap } from '@lib/path_map'
import { SWRUniqueKey } from '@lib/swrKey'
import type { UserInfo } from '@lib/types'
import { MRT_ColumnDef } from 'material-react-table'
import { useCallback, useState } from 'react'
import useSWR from 'swr'

const columns: MRT_ColumnDef<UserInfo>[] = [
	{
		accessorKey: 'username',
		header: '用户名称',
		size: 160,
	},
	{
		accessorKey: 'department',
		header: '部门',
		size: 160,
	},
	{
		accessorKey: 'location',
		header: '办公室',
		size: 160,
	},
	{
		accessorKey: 'number',
		// enableClickToCopy: true,
		header: '编号',
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
	const { find_users } = await fetchData({
		find_users: {},
	})

	console.log(find_users)

	const { success, data, errmsg } = find_users

	return success ? data : (message.error(errmsg), undefined)
}

export default function AccountPage() {
	const [openUpload, setOpenUpload] = useState(false)

	const { data } = useSWR(SWRUniqueKey.Users, getData)

	const handleCloseUpload = useCallback(() => setOpenUpload(false), [])

	const handleOpenUpload = useCallback(() => setOpenUpload(true), [])

	return (
		<>
			<div className="h-16 bg-white mb-4 text-2xl px-4 flex items-center">
				{PathMap.Account}
			</div>

			<div className="px-4">
				<CustomTable<UserInfo>
					columns={columns}
					data={data}
					onUpload={handleOpenUpload}
				/>

				<CustomUpload open={openUpload} onCancel={handleCloseUpload} />
			</div>
		</>
	)
}
