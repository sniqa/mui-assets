import CustomTable from '@comps/CustomTable'
import { fetchData } from '@lib/fetch'
import { message } from '@lib/MessageContainer'
import { PathMap } from '@lib/path_map'
import { SWRUniqueKey } from '@lib/swrKey'
import type { LogInfo } from '@lib/types'
import { MRT_ColumnDef } from 'material-react-table'
import useSWR from 'swr'

const columns: MRT_ColumnDef<LogInfo>[] = [
	{
		accessorKey: 'timestamp',
		header: '时间',
		size: 160,
	},
	{
		accessorKey: 'who',
		header: '操作人',
		size: 160,
	},
	{
		accessorKey: 'for_who',
		header: '对象',
		size: 160,
	},
	{
		accessorKey: 'event',
		// enableClickToCopy: true,
		header: '事件',
		size: 120,
	},
	{
		accessorKey: 'state',
		// enableClickToCopy: true,
		header: '结果',
		size: 120,
	},

	{
		accessorKey: 'message',
		// enableClickToCopy: true,
		header: '信息',
		size: 150,
	},
	{
		accessorKey: 'before_update',
		// enableClickToCopy: true,
		header: '更新前',
		size: 150,
	},
	{
		accessorKey: 'after_update',
		// enableClickToCopy: true,
		header: '更新后',
		size: 150,
	},
]

const getData = async () => {
	const { find_logs } = await fetchData({
		find_logs: {},
	})

	const { success, data, errmsg } = find_logs

	return success ? data : (message.error(errmsg), undefined)
}

export default function LogPage() {
	const { data, isLoading, isValidating } = useSWR(SWRUniqueKey.Logs, getData)

	console.log(isLoading)

	// if (isLoading || isValidating) {
	// 	return <div className="">log Loading</div>
	// }

	return (
		<>
			<div className="h-16 bg-white mb-4 text-2xl px-4 flex items-center">
				{PathMap.Message}
			</div>

			<div className="px-4">
				<CustomTable<LogInfo> columns={columns} data={data} />
			</div>
		</>
	)
}
