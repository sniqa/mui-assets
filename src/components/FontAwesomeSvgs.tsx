/// <reference types="vite-plugin-svgr/client" />

import Icon from '@ant-design/icons'
import { ReactComponent as UsbKeySvg } from '@svgs/brands/usb.svg'
import { ReactComponent as ProfileSvg } from '@svgs/solid/book-open.svg'
import { ReactComponent as DepartmentSvg } from '@svgs/solid/building.svg'
import { ReactComponent as SummarySvg } from '@svgs/solid/chart-pie.svg'
import { ReactComponent as LinerSvg } from '@svgs/solid/cloud.svg'
import { ReactComponent as ComputerSvg } from '@svgs/solid/computer.svg'
import { ReactComponent as DeviceSvg } from '@svgs/solid/desktop.svg'
import { ReactComponent as IpAddressSvg } from '@svgs/solid/diagram-project.svg'
import { ReactComponent as DocumentSvg } from '@svgs/solid/file-lines.svg'
import { ReactComponent as NetworkTypeSvg } from '@svgs/solid/globe.svg'
import { ReactComponent as ServerSvg } from '@svgs/solid/hard-drive.svg'
import { ReactComponent as HouseSvg } from '@svgs/solid/house.svg'
import { ReactComponent as TopologySvg } from '@svgs/solid/images.svg'
import { ReactComponent as DeviceBaseSvg } from '@svgs/solid/laptop-medical.svg'
import { ReactComponent as SearchSvg } from '@svgs/solid/magnifying-glass.svg'
import { ReactComponent as MessageSvg } from '@svgs/solid/message.svg'
import { ReactComponent as NetworkSvg } from '@svgs/solid/network-wired.svg'
import { ReactComponent as TelSvg } from '@svgs/solid/phone.svg'
import { ReactComponent as OfficeEquipmentSvg } from '@svgs/solid/print.svg'
import { ReactComponent as NetworkDeviceSvg } from '@svgs/solid/server.svg'
import { ReactComponent as UserSvg } from '@svgs/solid/user-gear.svg'
import { ReactComponent as AccountSvg } from '@svgs/solid/user.svg'

export const IconHome = () => <Icon component={HouseSvg} />
export const IconUser = () => <Icon component={UserSvg} />
export const IconDepartment = () => <Icon component={DepartmentSvg} />
export const IconAccount = () => <Icon component={AccountSvg} />
export const IconProfile = () => <Icon component={ProfileSvg} />
export const IconDocument = () => <Icon component={DocumentSvg} />
export const IconTopology = () => <Icon component={TopologySvg} />
export const IconNetwork = () => <Icon component={NetworkSvg} />
export const IconSummary = () => <Icon component={SummarySvg} />
export const IconNetworkType = () => <Icon component={NetworkTypeSvg} />
export const IconIpAddress = () => <Icon component={IpAddressSvg} />
export const IconTel = () => <Icon component={TelSvg} />
export const IconDevice = () => <Icon component={DeviceSvg} />
export const IconComputer = () => <Icon component={ComputerSvg} />
export const IconOfficeEquipment = () => <Icon component={OfficeEquipmentSvg} />
export const IconNetworkDevice = () => <Icon component={NetworkDeviceSvg} />
export const IconServer = () => <Icon component={ServerSvg} />
export const IconUsbKey = () => <Icon component={UsbKeySvg} />
export const IconMessage = () => <Icon component={MessageSvg} />
export const IconSearch = () => <Icon component={SearchSvg} />
export const IconDeviceBase = () => <Icon component={DeviceBaseSvg} />
export const IconLiner = () => <Icon component={LinerSvg} />
