export interface WithId {
	_id: string
}

// department
export interface DepartmentInfo {
	department_name: string
	locations: string[]
	remark: string
}

export type DepartmentInfoWithId = WithId & DepartmentInfo

// device base
export interface DeviceBaseInfo {
	vendor: string //设备品牌
	device_model: string //设备型号
	device_category: DeviceCategory | string //设备分类
	device_kind: DeviceKind | string //设备种类
	manufacture_date: string //出厂日期
	shelf_life: string //保质期
	remark: string
}

export type DeviceBaseInfoWithId = WithId & DeviceBaseInfo

// device
export interface DeviceInfo {
	user: string
	device_name: string
	serial_number: string
	location: string
	level_one_network: string //网络类型
	level_two_network: string //网络类型
	level_three_network: string //网络类型
	ip_address: string
	mac: string
	device_model: string //设备型号
	device_kind: string //设备种类
	device_category: DeviceCategory //设备分类
	system_version: string
	disk_sn: string
	remark: string
}

export type DeviceInfoWithId = WithId & DeviceInfo

// document
export interface DocumentInfo {
	title: string
	content: string
	create_timestamp: number
	last_modify_timestamp: number
	autor: string
	description: string
}

export type DocumentInfoWithId = WithId & DocumentInfo

export interface DocumentHistoryInfo {
	document_id: string
	content: string
	timestamp: number
}

export type DocumentHistoryInfoWithId = WithId & DocumentHistoryInfo

// ipaddress
export interface IpAddressInfo {
	_id: string
	user: string
	ip_address: string
	level_one_network: string //网络类型
	level_two_network: string //网络类型
	level_three_network: string //网络类型
	device_kind: DeviceKind
	is_used: boolean
	enable_time: number
	remark: string
}

export type IpAddressInfoWithId = WithId & IpAddressInfo

// network type
export interface NetworkTypeInfo {
	level_one_network: string //网络类型
	level_two_network: string //网络类型
	level_three_network: string //网络类型
	ip_address_start: string
	ip_address_end: string
	netmask: string
	gateway: string
	dns: string
	used_number?: number
	unused_number?: number
	total_number?: number
	remark: string
}

export type NetworkTypeInfoWithId = WithId & NetworkTypeInfo

// usb key
export interface UsbKeyInfo {
	number: string
	user: string
	enable_time: number
	collection_time: number
	return_time: number
	remark: string
}

export type UsbKeyInfoWithId = WithId & UsbKeyInfo

// user
export interface UserInfo {
	_id: string
	account?: string
	username?: string
	nickname?: string
	number?: string
	department?: string
	location?: string
	remark?: string
}

export type UserInfoWithId = WithId & UserInfo

// log
export interface LogInfo {
	timestamp: number
	who: string
	for_who: string
	event: string
	state: boolean
	message: string
	before_update: string
	after_update: string
}

export type LogInfoWithId = WithId & LogInfo

// liner
export interface LinerInfo {}
export type LinerInfoWithId = WithId & LinerInfo

// Tel
export interface TelInfo {}
export type TelInfoWithId = WithId & TelInfo

// network level
export interface NetworkLevelTwo {
	level_two_network: string;
	level_three_network: string[];
  }
  
  export interface NetworkLevelInfo {
	level_one_network: string;
	child_network: NetworkLevelTwo[];
  }
  
  
  export type NetworkLevelInfoWithId = WithId & NetworkLevelInfo