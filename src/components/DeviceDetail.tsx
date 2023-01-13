import { Autocomplete, TextField } from '@mui/material'
import { memo, useEffect, useMemo } from 'react'

import useSWR, { preload } from 'swr'

import CustomSelect from '@comps/CustomSelect'
import { fetchData } from '@lib/fetch'
import { SWRUniqueKey } from '@lib/swrKey'
import type { DepartmentInfoWithId, DeviceInfo, DeviceInfoWithId, IpAddressInfoWithId, NetworkTypeInfoWithId, UserInfoWithId } from '@lib/types'
import { useState } from 'react'
import { DeviceCategory, DeviceKind } from '@lib/deviceBase'

const getData = async () => {
	const {
		find_users,
		find_departments,
		find_network_types,
		find_ips,
		find_device_bases,
	} = await fetchData({
		find_users: {},
		find_departments: {},
		find_network_types: {},
		find_ips: {},
		find_device_bases: {},
	})

	return {
		userInfos: find_users.success ? find_users.data : [],
		departmentInfos: find_departments.success ? find_departments.data : [],
		networkTypeInfos: find_network_types.success ? find_network_types.data : [],
		ipAddressInfos: find_ips.success ? find_ips.data : [],
		deviceBaseInfos: find_device_bases.success ? find_device_bases.data : [],
	} as {
		userInfos: UserInfoWithId[],
		departmentInfos: DepartmentInfoWithId[],
		networkTypeInfos: NetworkTypeInfoWithId[],
		ipAddressInfos: IpAddressInfoWithId[],
		deviceBaseInfos: DeviceInfoWithId[]
	}
}

// 预取数据
preload(SWRUniqueKey.DeviceOptions, getData)

type DeviceConfig = DeviceInfoWithId | {}

interface DeviceDetailProps {
	emitValue: (value: () => DeviceInfoWithId) => void
	defaultValue: DeviceInfoWithId | null
	deviceCategory: DeviceCategory
}

const optionsDefault = ['']

const DeviceDetail = ({ emitValue, defaultValue, deviceCategory }: DeviceDetailProps) => {
	const [value, setValue] = useState<DeviceInfoWithId>(defaultValue || {
		_id: '',
		user: '',
		device_name: '',
		serial_number: '',
		location: '',
		level_one_network: '', //一级网络
		level_two_network: '', //二级网络
		level_three_network: '', //三级网络
		ip_address: '',
		mac: '',
		device_model: '', //设备型号
		device_kind: DeviceKind.None, //设备种类
		device_category: deviceCategory, //设备分类
		system_version: '',
		disk_sn: '',
		remark: '',
	})

	emitValue(() => value)

	console.log('device-detail')

	const { data } = useSWR(SWRUniqueKey.DeviceOptions, getData)

	return (
		<div className={`flex flex-wrap items-center py-2 pl-2`}>
			<TextField
				label={`序列号`}
				size="small"
				sx={{ width: '16rem', mr: '1rem', mb: '1rem' }}
				defaultValue={defaultValue?.serial_number || ''}
				onChange={(e) =>
					setValue((old) => ({
						...old,
						serial_number: e.target.value.trim(),
					}))
				}
			/>

			<Autocomplete
				sx={{ width: '16rem', mr: '1rem', mb: '1rem' }}
				renderInput={(params) => (
					<TextField label={`使用人`} {...params} size="small" />
				)}
				defaultValue={defaultValue?.user || ''}
				options={
					data?.userInfos.map((u) => u?.username || '').concat('') ||
					optionsDefault
				}
				onChange={(e, newValue) => {
					setValue((old) => ({ ...old, user: newValue || '' }))
				}}
			/>

			<Autocomplete
				sx={{ width: '16rem', mr: '1rem', mb: '1rem' }}
				renderInput={(params) => (
					<TextField label={`物理位置`} {...params} size="small" />
				)}
				options={
					data?.departmentInfos.flatMap((l) => l?.locations || '').concat('') ||
					optionsDefault
				}
				defaultValue={defaultValue?.location || ''}
				onChange={(e, newValue) =>
					setValue((old) => ({ ...old, location: newValue || '' }))
				}
			/>

			<Autocomplete
				sx={{ width: '16rem', mr: '1rem', mb: '1rem' }}
				renderInput={(params) => (
					<TextField label={`一级网络`} {...params} size="small" />
				)}
				options={
					data?.networkTypeInfos
						.map((n) => n?.level_one_network || '')
						.concat('') || optionsDefault
				}
				defaultValue={defaultValue?.level_one_network || ''}
				onChange={(e, newValue) =>
					setValue((old) => ({ ...old, level_one_network: newValue || '' }))
				}
			/>
			<Autocomplete
				sx={{ width: '16rem', mr: '1rem', mb: '1rem' }}
				renderInput={(params) => (
					<TextField label={`二级网络`} {...params} size="small" />
				)}
				options={
					data?.networkTypeInfos
						.map((n) => n?.level_two_network || '')
						.concat('') || optionsDefault
				}
				defaultValue={defaultValue?.level_two_network || ''}
				onChange={(e, newValue) =>
					setValue((old) => ({ ...old, level_two_network: newValue || '' }))
				}
			/>
			<Autocomplete
				sx={{ width: '16rem', mr: '1rem', mb: '1rem' }}
				renderInput={(params) => (
					<TextField label={`三级网络`} {...params} size="small" />
				)}
				options={
					data?.networkTypeInfos
						.map((n) => n?.level_three_network || '')
						.concat('') || optionsDefault
				}
				defaultValue={defaultValue?.level_three_network || ''}
				onChange={(e, newValue) =>
					setValue((old) => ({
						...old,
						level_three_network: newValue || '',
					}))
				}
			/>

			{/* ip地址 */}
			<CustomSelect
				sx={{ width: '16rem', mr: '1rem', mb: '1rem' }}
				label={`ip地址`}
				options={
					data?.ipAddressInfos
						.filter(
							(i) =>
								i.level_one_network ===
									value.level_one_network &&
								i.level_two_network ===
									value.level_two_network &&
								i.level_three_network ===
									value.level_three_network &&
								i.is_used === false
						)
						.map((d) => d.ip_address)
						.concat(
							defaultValue?.ip_address ? ['', defaultValue.ip_address] : ''
						) || optionsDefault
				}
				value={defaultValue?.ip_address || ''}
				onChange={(value) =>
					setValue((old) => ({ ...old, ip_address: value.toString() }))
				}
			/>

			<TextField
				label={`MAC`}
				size="small"
				sx={{ width: '16rem', mr: '1rem', mb: '1rem' }}
				defaultValue={defaultValue?.mac || ''}
				onChange={(e) =>
					setValue((old) => ({
						...old,
						ip_address: e.target.value.trim(),
					}))
				}
			/>

			{/* <TextField label={`物理位置`} size="small" /> */}

			<Autocomplete
				sx={{ width: '16rem', mr: '1rem', mb: '1rem' }}
				renderInput={(params) => (
					<TextField label={`设备型号`} {...params} size="small" />
				)}
				options={
					data?.deviceBaseInfos.map((d) => d?.device_model || '').concat('') ||
					optionsDefault
				}
				defaultValue={defaultValue?.device_model || ''}
				onChange={(e, newValue) =>
					setValue((old) => ({ ...old, device_model: newValue || '' }))
				}
			/>

			<TextField
				label={`系统版本`}
				size="small"
				sx={{ width: '16rem', mr: '1rem', mb: '1rem' }}
				defaultValue={defaultValue?.system_version || ''}
				onChange={(e) =>
					setValue((old) => ({
						...old,
						system_version: e.target.value.trim(),
					}))
				}
			/>

			<TextField
				label={`磁盘SN`}
				size="small"
				sx={{ width: '16rem', mr: '1rem', mb: '1rem' }}
				defaultValue={defaultValue?.disk_sn || ''}
				onChange={(e) =>
					setValue((old) => ({
						...old,
						disk_sn: e.target.value.trim(),
					}))
				}
			/>

			<TextField
				label={`备注`}
				multiline
				minRows={3}
				size="small"
				sx={{ width: '33rem' }}
				defaultValue={defaultValue?.remark || ''}
				onChange={(e) =>
					setValue((old) => ({
						...old,
						remark: e.target.value.trim(),
					}))
				}
			/>
		</div>
	)
}

export default memo(DeviceDetail)
