import CustomTable from '@comps/CustomTable'
import { fetchData } from '@lib/fetch'
import { message } from '@lib/MessageContainer'
import { PathMap } from '@lib/path_map'
import { SWRUniqueKey } from '@lib/swrKey'
import type { IpAddressInfo } from '@lib/types'
import { MRT_ColumnDef } from 'material-react-table'
import useSWR from 'swr'

const columns: MRT_ColumnDef<IpAddressInfo>[] = [
	{
		accessorKey: 'ip_address',
		// enableClickToCopy: true,
		header: 'ip地址',
		size: 160,
	},
	{
		accessorKey: 'user',
		// enableClickToCopy: true,
		header: '使用人',
		size: 160,
	},
	{
		accessorKey: 'level_one_network',
		// enableClickToCopy: true,
		header: '一级网络',
		size: 150,
	},
	{
		accessorKey: 'level_two_network',
		// enableClickToCopy: true,
		header: '二级网络',
		size: 150,
	},
	{
		accessorKey: 'level_three_network',
		// enableClickToCopy: true,
		header: '三级网络',
		size: 150,
	},
	{
		accessorKey: 'is_used',
		// enableClickToCopy: true,
		header: '状态',
		Cell: ({ cell }) => {
			const value = cell.getValue<string>()

			return (
				<div
					className={value === '未使用' ? 'text-gray-500' : 'text-green-600'}
				>
					{value}
				</div>
			)
		},
		size: 160,
	},
	{
		accessorKey: 'device_kind',
		// enableClickToCopy: true,
		header: '设备种类',
		size: 160,
	},

	{
		accessorKey: 'enable_time',
		// enableClickToCopy: true,
		header: '启用时间',
		size: 160,
	},
	{
		accessorKey: 'remark',
		// enableClickToCopy: true,
		header: '备注',
		size: 160,
	},
]

// 获取数据
const getData = async () => {
	const { find_liners } = await fetchData({ find_liners: {} })

	const { success, data, errmsg } = find_liners

	return success ? data : (message.error(errmsg), undefined)
}

// ui
export default function IpAddressPage() {
	const { data } = useSWR(SWRUniqueKey.IpAddress, getData)

	return (
		<>
			<div className="h-16 bg-white mb-4 text-2xl px-4 flex items-center">
				{PathMap.Ip_address}
			</div>

			<div className="px-4">
				<CustomTable<IpAddressInfo> columns={columns} data={data} />
			</div>
		</>
	)
}
