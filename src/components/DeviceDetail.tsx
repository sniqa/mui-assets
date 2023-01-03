import { Autocomplete, TextField } from '@mui/material'
import { memo, useEffect } from 'react'

import useSWR, { preload } from 'swr'

import CustomSelect from '@comps/CustomSelect'
import { fetchData } from '@lib/fetch'
import { SWRUniqueKey } from '@lib/swrKey'
import type { DeviceInfo, DeviceInfoWithId } from '@lib/types'

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
		userInfo: find_users.success ? find_users.data : [],
		networkTypeInfos: find_network_types.success ? find_network_types.data : [],
		ipAddressInfos: find_ips.success ? find_ips.data : [],
		deviceBaseInfos: find_device_bases.success ? find_device_bases.data : [],
	}
}

// 预取数据
preload(SWRUniqueKey.DeviceOptions, getData)

type DeviceConfig = DeviceInfoWithId | DeviceInfo | {}

interface DeviceDetailProps {
	onChange: React.Dispatch<React.SetStateAction<DeviceConfig>>
	defaultValue: DeviceInfoWithId | null
}

const optionsDefault = ['']

const DeviceDetail = ({ onChange, defaultValue }: DeviceDetailProps) => {
	console.log('device-detail')

	useEffect(() => {
		console.log(defaultValue)

		defaultValue && onChange(defaultValue)
	}, [defaultValue])

	const { data } = useSWR(SWRUniqueKey.DeviceOptions, getData)

	return (
		<div className={`flex flex-wrap items-center py-2 pl-2`}>
			<TextField
				label={`序列号`}
				size="small"
				sx={{ width: '16rem', mr: '1rem', mb: '1rem' }}
				defaultValue={defaultValue?.serial_number || ''}
				onChange={(e) =>
					onChange((old) => ({
						...old,
						serial_number: e.currentTarget.value.trim(),
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
					onChange((old) => ({ ...old, user: newValue || '' }))
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
					onChange((old) => ({ ...old, location: newValue || '' }))
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
					onChange((old) => ({ ...old, level_one_network: newValue || '' }))
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
					onChange((old) => ({ ...old, level_two_network: newValue || '' }))
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
					onChange((old) => ({
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
									data.networkTypeInfos.level_one_network &&
								i.level_two_network ===
									data.networkTypeInfos.level_two_network &&
								i.level_three_network ===
									data.networkTypeInfos.level_three_network &&
								i.is_used === false
						)
						.map((d) => d.ip_address)
						.concat(
							defaultValue?.ip_address ? ['', defaultValue.ip_address] : ''
						) || optionsDefault
				}
				value={defaultValue?.ip_address || ''}
				onChange={(value) =>
					onChange((old) => ({ ...old, ip_address: value.toString() }))
				}
			/>

			<TextField
				label={`MAC`}
				size="small"
				sx={{ width: '16rem', mr: '1rem', mb: '1rem' }}
				defaultValue={defaultValue?.mac || ''}
				onChange={(e) =>
					onChange((old) => ({
						...old,
						ip_address: e.currentTarget.value.trim(),
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
					onChange((old) => ({ ...old, device_model: newValue || '' }))
				}
			/>

			<TextField
				label={`系统版本`}
				size="small"
				sx={{ width: '16rem', mr: '1rem', mb: '1rem' }}
				defaultValue={defaultValue?.system_version || ''}
				onChange={(e) =>
					onChange((old) => ({
						...old,
						system_version: e.currentTarget.value.trim(),
					}))
				}
			/>

			<TextField
				label={`磁盘SN`}
				size="small"
				sx={{ width: '16rem', mr: '1rem', mb: '1rem' }}
				defaultValue={defaultValue?.disk_sn || ''}
				onChange={(e) =>
					onChange((old) => ({
						...old,
						disk_sn: e.currentTarget.value.trim(),
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
					onChange((old) => ({
						...old,
						remark: e.currentTarget.value.trim(),
					}))
				}
			/>
		</div>
	)
}

export default memo(DeviceDetail)
