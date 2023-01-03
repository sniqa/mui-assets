export enum DeviceCategory {
	Computer = 'computer',
	OfficeEquipment = 'officeEquipment',
	NetDevice = 'netDevice',
	Server = 'server',
	None = '',
}

export const DeviceCategorys = [
	'',
	'computer',
	'officeEquipment',
	'netDevice',
	'server',
]

// export type DeviceKind =
//   | '一体机'
//   | '笔记本'
//   | '台式机'
//   | '打印机'
//   | '复印机'
//   | '针式打印机'
//   | '扫描仪'
//   | '传真机'
//   | '座机'
//   | '交换机'
//   | '防火墙'
//   | '密码机'
//   | '堡垒机'
//   | '服务器'

export enum DeviceKind {
	All_in_one = '一体机',
	Laptop = '笔记本',
	Desktop = '台式机',
	Printer = '打印机',
	Duplicator = '复印机',
	Scanner = '扫描仪',
	Fax = '传真机',
	Landline = '座机',
	Switch = '交换机',
	Firewall = '防火墙',
	Bastionhost = '堡垒机',
	Cipher = '密码机',
	Server = '服务器',
	None = '',
}

export const DeviceKinds = [
	'',
	'一体机',
	'笔记本',
	'台式机',
	'打印机',
	'复印机',
	'扫描仪',
	'传真机',
	'座机',
	'交换机',
	'防火墙',
	'堡垒机',
	'密码机',
	'服务器',
]

export const getDeviceCategoryFromDeviceKind = (
	target: DeviceKind | string
) => {
	switch (target) {
		case DeviceKind.All_in_one:
		case DeviceKind.Laptop:
		case DeviceKind.Desktop:
			return DeviceCategory.Computer
		case DeviceKind.Printer:
		case DeviceKind.Duplicator:
		case DeviceKind.Scanner:
		case DeviceKind.Fax:
		case DeviceKind.Landline:
			return DeviceCategory.OfficeEquipment
		case DeviceKind.Switch:
		case DeviceKind.Firewall:
		case DeviceKind.Bastionhost:
		case DeviceKind.Cipher:
			return DeviceCategory.NetDevice
		case DeviceKind.Server:
			return DeviceCategory.Server
		default:
			return ''
	}
}

export const getDeviceKindFromDeviceCategory = (target: DeviceCategory) => {
	switch (target) {
		case DeviceCategory.Computer:
			return [DeviceKind.All_in_one, DeviceKind.Laptop, DeviceKind.Desktop]
		case DeviceCategory.OfficeEquipment:
			return [
				DeviceKind.Printer,
				DeviceKind.Duplicator,
				DeviceKind.Scanner,
				DeviceKind.Fax,
				DeviceKind.Landline,
			]
		case DeviceCategory.NetDevice:
			return [
				DeviceKind.Switch,
				DeviceKind.Firewall,
				DeviceKind.Bastionhost,
				DeviceKind.Cipher,
			]
		case DeviceCategory.Server:
			return [DeviceKind.Server]
		default:
			return ''
	}
}
