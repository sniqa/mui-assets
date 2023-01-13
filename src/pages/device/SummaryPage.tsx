import { Pie, PieConfig } from '@ant-design/plots'
import { PathMap } from '@lib/path_map'
import { MRT_ColumnDef } from 'material-react-table'
import { useCallback, useMemo, useState } from 'react'
import { SWRUniqueKey } from '@lib/swrKey'
import useSWR from 'swr'
import { fetchData } from '@lib/fetch'
import { DeviceInfoWithId } from '@lib/types'
import { DeviceCategory } from '@lib/deviceBase'

export default function SummaryPage() {
	const { data } = useSWR<DeviceInfoWithId[]>(SWRUniqueKey.DeviceSummary, async () => {
		const {find_devices} = await fetchData({ find_devices: {} })

		const { success, data } = find_devices
		
		return success ? data: []
	})

	const config = useMemo<PieConfig>(() => ({
		appendPadding: 10,
		data: [
			{
				type: '计算机',
				value: data?.filter(d => d.device_category === DeviceCategory.Computer).length
			},
			{
				type: '办公设备',
				value: data?.filter(d => d.device_category === DeviceCategory.OfficeEquipment).length
			},
			{
				type:"服务器",
				value: data?.filter(d => d.device_category === DeviceCategory.Server).length
			},
			{
				type: '网络设备',
				value: data?.filter(d => d.device_category === DeviceCategory.NetDevice).length
			}
		],
		angleField: 'value',
		colorField: 'type',
		radius: 0.75,
		label: {
			type: 'spider',
			labelHeight: 28,
			content: '{name}\n{value}'
		},
		interactions: [
			{
				type: 'element-selected'
			},
			{
				type: 'element-active'
			}
		]
	}), [data])
 
	return (
		<div className='h-screen'>
			<div className="h-16 bg-white mb-4 text-2xl px-4 flex items-center">
				{PathMap.Device_summary}
			</div>

			<div className="px-4 h-auto">
				<Pie {...config }/>

				<p className='w-full flex justify-center text-2xl'>总数：{data?.length}</p>
			</div>
		</div>
	)
}
