/// <reference types="vite-plugin-svgr/client"fontSize="inherit" {...props} />

import { SvgIcon, SvgIconProps } from "@mui/material";
import { ReactComponent as UsbKeySvg } from "@svgs/brands/usb.svg";
import { ReactComponent as ProfileSvg } from "@svgs/solid/book-open.svg";
import { ReactComponent as DepartmentSvg } from "@svgs/solid/building.svg";
import { ReactComponent as SummarySvg } from "@svgs/solid/chart-pie.svg";
import { ReactComponent as LinerSvg } from "@svgs/solid/cloud.svg";
import { ReactComponent as ComputerSvg } from "@svgs/solid/computer.svg";
import { ReactComponent as DeviceSvg } from "@svgs/solid/desktop.svg";
import { ReactComponent as IpAddressSvg } from "@svgs/solid/diagram-project.svg";
import { ReactComponent as DocumentSvg } from "@svgs/solid/file-lines.svg";
import { ReactComponent as NetworkTypeSvg } from "@svgs/solid/globe.svg";
import { ReactComponent as ServerSvg } from "@svgs/solid/hard-drive.svg";
import { ReactComponent as HouseSvg } from "@svgs/solid/house.svg";
import { ReactComponent as TopologySvg } from "@svgs/solid/images.svg";
import { ReactComponent as DeviceBaseSvg } from "@svgs/solid/laptop-medical.svg";
import { ReactComponent as SearchSvg } from "@svgs/solid/magnifying-glass.svg";
import { ReactComponent as MessageSvg } from "@svgs/solid/message.svg";
import { ReactComponent as NetworkSvg } from "@svgs/solid/network-wired.svg";
import { ReactComponent as TelSvg } from "@svgs/solid/phone.svg";
import { ReactComponent as OfficeEquipmentSvg } from "@svgs/solid/print.svg";
import { ReactComponent as NetworkDeviceSvg } from "@svgs/solid/server.svg";
import { ReactComponent as UserSvg } from "@svgs/solid/user-gear.svg";
import { ReactComponent as AccountSvg } from "@svgs/solid/user.svg";
import { ReactComponent as ArrowBackSvg } from "@svgs/solid/chevron-left.svg";
import { ReactComponent as ChevronRightSvg } from "@svgs/solid/chevron-right.svg";
import { ReactComponent as ChevronLeftSvg } from "@svgs/solid/chevron-left.svg";
import { ReactComponent as AngleDownSvg } from "@svgs/solid/angle-down.svg";
import { ReactComponent as CaretDownSvg } from "@svgs/solid/caret-down.svg";
import { ReactComponent as GearSvg } from "@svgs/solid/gear.svg";

type IconProps = Omit<
  SvgIconProps,
  "component" | "inheritViewBox" | "fontSize"
>;

export const IconHome = (props: IconProps) => (
  <SvgIcon inheritViewBox component={HouseSvg} fontSize="inherit" {...props} />
);
export const IconUser = (props: IconProps) => (
  <SvgIcon inheritViewBox component={UserSvg} fontSize="inherit" {...props} />
);
export const IconDepartment = (props: IconProps) => (
  <SvgIcon
    inheritViewBox
    component={DepartmentSvg}
    fontSize="inherit"
    {...props}
  />
);
export const IconAccount = (props: IconProps) => (
  <SvgIcon
    inheritViewBox
    component={AccountSvg}
    fontSize="inherit"
    {...props}
  />
);
export const IconProfile = (props: IconProps) => (
  <SvgIcon
    inheritViewBox
    component={ProfileSvg}
    fontSize="inherit"
    {...props}
  />
);
export const IconDocument = (props: IconProps) => (
  <SvgIcon
    inheritViewBox
    component={DocumentSvg}
    fontSize="inherit"
    {...props}
  />
);
export const IconTopology = (props: IconProps) => (
  <SvgIcon
    inheritViewBox
    component={TopologySvg}
    fontSize="inherit"
    {...props}
  />
);
export const IconNetwork = (props: IconProps) => (
  <SvgIcon
    inheritViewBox
    component={NetworkSvg}
    fontSize="inherit"
    {...props}
  />
);
export const IconSummary = (props: IconProps) => (
  <SvgIcon
    inheritViewBox
    component={SummarySvg}
    fontSize="inherit"
    {...props}
  />
);
export const IconNetworkType = (props: IconProps) => (
  <SvgIcon
    inheritViewBox
    component={NetworkTypeSvg}
    fontSize="inherit"
    {...props}
  />
);
export const IconIpAddress = (props: IconProps) => (
  <SvgIcon
    inheritViewBox
    component={IpAddressSvg}
    fontSize="inherit"
    {...props}
  />
);
export const IconTel = (props: IconProps) => (
  <SvgIcon inheritViewBox component={TelSvg} fontSize="inherit" {...props} />
);
export const IconDevice = (props: IconProps) => (
  <SvgIcon inheritViewBox component={DeviceSvg} fontSize="inherit" {...props} />
);
export const IconComputer = (props: IconProps) => (
  <SvgIcon
    inheritViewBox
    component={ComputerSvg}
    fontSize="inherit"
    {...props}
  />
);
export const IconOfficeEquipment = (props: IconProps) => (
  <SvgIcon
    inheritViewBox
    component={OfficeEquipmentSvg}
    fontSize="inherit"
    {...props}
  />
);
export const IconNetworkDevice = (props: IconProps) => (
  <SvgIcon
    inheritViewBox
    component={NetworkDeviceSvg}
    fontSize="inherit"
    {...props}
  />
);
export const IconServer = (props: IconProps) => (
  <SvgIcon inheritViewBox component={ServerSvg} fontSize="inherit" {...props} />
);
export const IconUsbKey = (props: IconProps) => (
  <SvgIcon inheritViewBox component={UsbKeySvg} fontSize="inherit" {...props} />
);
export const IconMessage = (props: IconProps) => (
  <SvgIcon
    inheritViewBox
    component={MessageSvg}
    fontSize="inherit"
    {...props}
  />
);
export const IconSearch = (props: IconProps) => (
  <SvgIcon inheritViewBox component={SearchSvg} fontSize="inherit" {...props} />
);
export const IconDeviceBase = (props: IconProps) => (
  <SvgIcon
    inheritViewBox
    component={DeviceBaseSvg}
    fontSize="inherit"
    {...props}
  />
);
export const IconLiner = (props: IconProps) => (
  <SvgIcon inheritViewBox component={LinerSvg} fontSize="inherit" {...props} />
);
export const IconArrowBack = (props: IconProps) => (
  <SvgIcon
    inheritViewBox
    component={ArrowBackSvg}
    fontSize="inherit"
    {...props}
  />
);
export const IconChevronRight = (props: IconProps) => (
  <SvgIcon
    inheritViewBox
    component={ChevronRightSvg}
    fontSize="inherit"
    {...props}
  />
);
export const IconChevronLeft = (props: IconProps) => (
  <SvgIcon
    inheritViewBox
    component={ChevronLeftSvg}
    fontSize="inherit"
    {...props}
  />
);
export const IconAngleDown = (props: IconProps) => (
  <SvgIcon
    inheritViewBox
    component={AngleDownSvg}
    fontSize="inherit"
    {...props}
  />
);
export const IconCaretDown = (props: IconProps) => (
  <SvgIcon
    inheritViewBox
    component={CaretDownSvg}
    fontSize="inherit"
    {...props}
  />
);
export const IconSettings = (props: IconProps) => (
  <SvgIcon inheritViewBox component={GearSvg} fontSize="inherit" {...props} />
);
