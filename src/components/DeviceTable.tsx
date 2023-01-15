import CustomTable from '@comps/CustomTable2'
import DeviceDetail from '@comps/DeviceDetail'
import { DeviceCategory } from '@lib/deviceBase'
import { fetchData } from '@lib/fetch'
import { PathMapEnum } from '@lib/path_map'
import type { DeviceInfoWithId, UserInfoWithId } from '@lib/types'
import { useChildToParent } from '@lib/utils'
import { MRT_ColumnDef } from 'material-react-table'
import { useSnackbar } from 'notistack'
import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'

const columns: MRT_ColumnDef<DeviceInfoWithId>[] = [
	// {
	// 	accessorKey: '_id',
	// 	// enableClickToCopy: true,
	// 	header: 'ID',
	// 	size: 150,
	// },
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
	// {
	// 	accessorKey: 'device_category',
	// 	// enableClickToCopy: true,
	// 	header: '设备分类',
	// 	size: 200,
	// },
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

export default function DeviceTable({
	pageTitle = PathMapEnum.None,
	deviceCategory,
}: DeviceTableProps) {
	const { childHook, parentHook } = useChildToParent<DeviceInfoWithId>()

	const { enqueueSnackbar } = useSnackbar()

	// 获取数据
	const { data, mutate } = useSWR(
		deviceCategory,
		async (deviceCategory: DeviceCategory) => {
			const { find_devices } = await fetchData({
				find_devices: { device_category: deviceCategory },
			})

			const { success, data, errmsg } = find_devices

			console.log(find_devices)

			return success
				? data
				: (enqueueSnackbar(errmsg, { variant: 'error' }), undefined)
		}
	)

	// 删除单个
	const handleOnDelete = useSWRMutation(
		deviceCategory,
		async (_key: any, { arg }: { arg: DeviceInfoWithId }) => {
			console.log(arg)

			const { delete_device } = await fetchData({ delete_device: arg })

			console.log(delete_device)

			const { success, data, errmsg } = delete_device

			return success
				? (enqueueSnackbar('删除成功', { variant: 'success' }), data)
				: (enqueueSnackbar(errmsg, { variant: 'error' }), [])
		}
	)

	// 删除多选中
	const handleOnDeleteSelected = useSWRMutation(
		deviceCategory,
		async (_key: any, { arg }: { arg: DeviceInfoWithId[] }) => {
			const ids = arg.map((a) => a._id)

			const { delete_many_device_by_id } = await fetchData({
				delete_many_device_by_id: [ids],
			})

			const { success, data, errmsg } = delete_many_device_by_id

			return success
				? (enqueueSnackbar('删除成功', { variant: 'success' }), data)
				: (enqueueSnackbar(errmsg, { variant: 'error' }), [])
		}
	)

	// 创建
	const handleOnCreateSave = useSWRMutation(
		deviceCategory,
		async (_key: string, { arg }: { arg: UserInfoWithId | null }) => {
			console.log(arg)

			const { create_device } = await fetchData({
				create_device: arg,
			})

			const { success, data, errmsg } = create_device

			return success
				? (enqueueSnackbar('删除成功', { variant: 'success' }), data)
				: (enqueueSnackbar(errmsg, { variant: 'error' }), [])
		}
	)

	// 编辑
	const handleOnEditSave = useSWRMutation(
		deviceCategory,
		async (_key: string, { arg }: { arg: UserInfoWithId | null }) => {
			console.log(arg, 'edit')

			const { modify_device } = await fetchData({ modify_device: arg })

			console.log(modify_device)

			const { success, data, errmsg } = modify_device

			return success
				? (enqueueSnackbar('删除成功', { variant: 'success' }), data)
				: (enqueueSnackbar(errmsg, { variant: 'error' }), [])
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
					data={data || []}
					onCreate={() => handleOnCreateSave.trigger(parentHook())}
					onEdit={() => handleOnEditSave.trigger(parentHook())}
					onDelete={handleOnDelete.trigger}
					onDeleteSeleted={(data) => handleOnDeleteSelected.trigger(data)}
					rowCustomActionsSize={80}
					rowCustomSelectSize={30}
					downloadTemplate={`/设备模板.csv`}
					renderCustomDialogContent={(currentRow) => (
						<DeviceDetail
							defaultValue={currentRow}
							emitValue={childHook}
							deviceCategory={deviceCategory}
						/>
					)}
				/>
			</div>
		</>
	)
}
