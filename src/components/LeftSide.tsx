import {
	IconAccount,
	IconComputer,
	IconDepartment,
	IconDevice,
	IconDeviceBase,
	IconDocument,
	IconHome,
	IconIpAddress,
	IconLiner,
	IconMessage,
	IconNetwork,
	IconNetworkDevice,
	IconNetworkType,
	IconOfficeEquipment,
	IconProfile,
	IconServer,
	IconSummary,
	IconTel,
	IconTopology,
	IconUsbKey,
	IconUser,
} from '@comps/FontAwesomeSvgs'
import { Path } from '@lib/path_map'
import { Menu, MenuProps } from 'antd'
import React, { memo, useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'

type MenuItem = Required<MenuProps>['items'][number]

const generateMenuItem = (
	label: React.ReactNode,
	key: React.Key,
	icon?: React.ReactNode,
	children?: MenuItem[]
): MenuItem => {
	return {
		key,
		icon,
		children,
		label,
	} as MenuItem
}

const menuItem: MenuItem[] = [
	generateMenuItem('Home', Path.Home, <IconHome />),
	generateMenuItem('User', Path.User, <IconUser />, [
		generateMenuItem('Account', Path.Account, <IconAccount />),
		generateMenuItem('Department', Path.Department, <IconDepartment />),
	]),
	generateMenuItem('Profile', Path.Profile, <IconProfile />, [
		generateMenuItem('Document', Path.Document, <IconDocument />),
		generateMenuItem('Topology', Path.Topology, <IconTopology />),
	]),
	generateMenuItem('Network', Path.Network, <IconNetwork />, [
		generateMenuItem('NetworkSummary', Path.Network_summary, <IconSummary />),
		generateMenuItem('NetworkType', Path.Network_type, <IconNetworkType />),
		generateMenuItem('IpAddress', Path.Ip_address, <IconIpAddress />),
		generateMenuItem('Liner', Path.Liner, <IconLiner />),
		generateMenuItem('Tel', Path.Tel, <IconTel />),
	]),
	generateMenuItem('Device', Path.Device, <IconDevice />, [
		generateMenuItem('DeviceSummary', Path.Device_summary, <IconSummary />),
		generateMenuItem('Computer', Path.Computer, <IconComputer />),
		generateMenuItem(
			'OfficeEquipment',
			Path.Office_equipment,
			<IconOfficeEquipment />
		),
		generateMenuItem(
			'NetworkDevice',
			Path.Network_device,
			<IconNetworkDevice />
		),
		generateMenuItem('Server', Path.Server, <IconServer />),
		generateMenuItem('UsbKey', Path.Usb_key, <IconUsbKey />),
		generateMenuItem('DeviceBase', Path.Device_base, <IconDeviceBase />),
	]),
	generateMenuItem('Message', Path.Message, <IconMessage />),
]

const LeftSide = () => {
	console.log('leftside')

	const [current, setCurrent] = useState('home')

	const navigate = useNavigate()

	return (
		<Menu
			theme="dark"
			mode="inline"
			items={menuItem}
			selectedKeys={[current]}
			onClick={useCallback((e: any) => {
				navigate(e.key)
				setCurrent(e.key)
			}, [])}
		/>
	)
}

export default memo(LeftSide)
