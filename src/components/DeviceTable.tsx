import CustomTable from '@comps/CustomTable2'
import DeviceDetail from '@comps/DeviceDetail'
import { DeviceCategory } from '@lib/deviceBase'
import { fetchData } from '@lib/fetch'
import { message } from '@lib/MessageContainer'
import { PathMapEnum } from '@lib/path_map'
import type { DeviceInfo, DeviceInfoWithId, UserInfoWithId } from '@lib/types'
import { MRT_ColumnDef } from 'material-react-table'
import { useMemo, useState } from 'react'
import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'

const columns: MRT_ColumnDef<DeviceInfoWithId>[] = [
	{
		accessorKey: 'serial_number',
		// enableClickToCopy: true,
		header: '序列号',
		size: 150,
	},
	{
		accessorKey: 'user',
		// enableClickToCopy: true,
		header: '使用人',
		size: 150,
	},
	{
		accessorKey: 'location',
		// enableClickToCopy: true,
		header: '物理位置',
		size: 180,
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
		accessorKey: 'ip_address',
		// enableClickToCopy: true,
		header: 'ip地址',
		size: 180,
	},
	{
		accessorKey: 'mac',
		// enableClickToCopy: true,
		header: 'mac',
		size: 180,
	},
	{
		accessorKey: 'device_model',
		// enableClickToCopy: true,
		header: '设备型号',
		size: 200,
	},
	{
		accessorKey: 'device_kind',
		// enableClickToCopy: true,
		header: '设备类型',
		size: 150,
	},
	{
		accessorKey: 'device_category',
		// enableClickToCopy: true,
		header: '设备分类',
		size: 200,
	},
	{
		accessorKey: 'system_version',
		// enableClickToCopy: true,
		header: '系统版本',
		size: 200,
	},
	{
		accessorKey: 'disk_sn',
		// enableClickToCopy: true,
		header: '磁盘SN',
		size: 200,
	},
	{
		accessorKey: 'remark',
		// enableClickToCopy: true,
		header: '备注',
		size: 200,
	},
]

interface DeviceTableProps {
	pageTitle?: PathMapEnum
	deviceCategory: DeviceCategory
}

// 获取数据
const getData = async (deviceCategory: DeviceCategory) => {
	const { find_devices } = await fetchData({
		find_devices: { device_category: deviceCategory },
	})

	console.log(find_devices)

	const { success, data, errmsg } = find_devices

	return success ? data : (message.error(errmsg), undefined)
}

// 删除单个
const deleteData = async (_key: any, { arg }: { arg: DeviceInfoWithId }) => {
	console.log(arg)

	const { delete_device } = await fetchData({ delete_device: arg })

	console.log(delete_device)

	const { success, data, errmsg } = delete_device

	return success
		? (message.success('删除成功'), data)
		: (message.error(errmsg), undefined)
}

// 删除多个
const deleteDatas = async (_key: any, { arg }: { arg: DeviceInfoWithId[] }) => {
	console.log(arg)

	const ids = arg.map((a) => a._id)

	const { delete_many_device_by_ids } = await fetchData({
		delete_many_device_by_ids: [ids],
	})

	console.log(delete_many_device_by_ids)

	const { success, data, errmsg } = delete_many_device_by_ids

	return success
		? (message.success('删除成功'), data)
		: (message.error(errmsg), undefined)
}

type DeviceConfig = DeviceInfoWithId | DeviceInfo | {}

export default function DeviceTable({
	pageTitle = PathMapEnum.None,
	deviceCategory,
}: DeviceTableProps) {
	const [value, setValue] = useState(null)

	useMemo(() => console.log(value, 'value'), [value])

	const { data } = useSWR(deviceCategory, () => getData(deviceCategory))

	const handleOnDelete = useSWRMutation(deviceCategory, deleteData)

	const handleOnDeleteSelected = useSWRMutation(deviceCategory, deleteDatas)

	const handleOnCreateSave = useSWRMutation(
		deviceCategory,
		async (_key: string, { arg }: { arg: UserInfoWithId | null }) => {
			console.log('value', arg)

			const { create_device } = await fetchData({
				create_device: arg,
			})

			console.log(create_device)

			const { success, data, errmsg } = create_device

			return success
				? (message.success('创建成功'), data)
				: (message.error(errmsg), undefined)
		}
	)

	const handleOnEditSave = useSWRMutation(
		deviceCategory,
		async (_key: any, { arg }) => {
			console.log(arg, 'edit')

			const { modify_device } = await fetchData({ modify_device: arg })

			console.log(modify_device)

			const { success, data, errmsg } = modify_device

			return success
				? (message.success('更新成功'), data)
				: (message.error(errmsg), undefined)
		}
	)

	return (
		<>
			<div className="h-16 bg-white mb-4 text-2xl px-4 flex items-center">
				{pageTitle}
			</div>

			<div className="px-4">
				<CustomTable<DeviceInfoWithId>
					columns={columns}
					data={data}
					onCreate={() => handleOnCreateSave.trigger(value)}
					onEdit={handleOnEditSave.trigger}
					onDelete={handleOnDelete.trigger}
					onDeleteSeleted={handleOnDeleteSelected.trigger}
					rowCustomActionsSize={100}
					uploadState={{
						action: 'http://localhost:8083/upload',
					}}
					renderCustomDialogContent={(currentRow) => (
						<DeviceDetail defaultValue={currentRow} onChange={setValue} />
					)}
				/>
			</div>
		</>
	)
}
