import CustomTable from '@comps/CustomTable'
import CustomUpload from '@comps/CustomUpload'
import { fetchData } from '@lib/fetch'
import { message } from '@lib/MessageContainer'
import { PathMap } from '@lib/path_map'
import { SWRUniqueKey } from '@lib/swrKey'
import type { NetworkTypeInfo } from '@lib/types'
import { MRT_ColumnDef } from 'material-react-table'
import { useCallback, useState } from 'react'
import useSWR from 'swr'

type NetworkTypeConfig = Omit<
	NetworkTypeInfo,
	'used_number' | 'unused_number' | 'total_number'
> & {
	ip_use_detail: string
}

const columns: MRT_ColumnDef<NetworkTypeConfig>[] = [
	{
		accessorKey: 'level_one_network',
		enableClickToCopy: true,
		header: '一级网络',
		size: 160,
	},
	{
		accessorKey: 'level_two_network',
		enableClickToCopy: true,
		header: '二级网络',
		size: 160,
	},
	{
		accessorKey: 'level_three_network',
		enableClickToCopy: true,
		header: '三级网络',
		size: 160,
	},
	{
		accessorKey: 'ip_use_detail',
		enableClickToCopy: true,
		header: `已使用 / 未使用 / 总数`,
		size: 220,
	},
	{
		accessorKey: 'ip_address_start',
		enableClickToCopy: true,
		header: '开始地址',
		size: 160,
	},
	{
		accessorKey: 'ip_address_end',
		enableClickToCopy: true,
		header: '结束地址',
		size: 160,
	},
	{
		accessorKey: 'netmask',
		enableClickToCopy: true,
		header: '子网掩码',
		size: 160,
	},
	{
		accessorKey: 'gateway',
		enableClickToCopy: true,
		header: '网关',
		size: 160,
	},
	{
		accessorKey: 'dns',
		enableClickToCopy: true,
		header: 'DNS',
		size: 160,
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
	const { find_tels } = await fetchData({ find_tels: {} })

	const { success, data, errmsg } = find_tels

	return success ? data : (message.error(errmsg), undefined)
}

// UI
export default function NetworkTypePage() {
	const [openUpload, setOpenUpload] = useState(false)

	const { data } = useSWR(SWRUniqueKey.NetworkType, getData)

	return (
		<>
			<div className="h-16 bg-white mb-4 text-2xl px-4 flex items-center">
				{PathMap.Network_type}
			</div>

			<div className="px-4">
				<CustomTable<NetworkTypeConfig>
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
