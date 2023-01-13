import LeftSideItem from "./LeftSideItem";
import LeftSideExpandItem from "./LeftSideExpandItem";
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
  IconChevronRight,
  IconChevronLeft,
  IconSettings,
} from "@comps/FontAwesomeSvgs";
import { useState } from "react";
import { Path } from "@lib/path_map";
import { LeftSideItemProps } from "@comps/leftside/LeftSideItem";

const generateMenuItem = (
  title: React.ReactNode,
  to: string,
  icon: React.ReactNode,
  subItems?: LeftSideItemProps[]
): LeftSideItemProps => {
  return {
    to,
    icon,
    subItems,
    title,
  } as LeftSideItemProps;
};

const menuItem: LeftSideItemProps[] = [
  generateMenuItem("Home", Path.Home, <IconHome />),
  generateMenuItem("User", Path.User, <IconUser />, [
    generateMenuItem("Account", Path.Account, <IconAccount />),
    generateMenuItem("Department", Path.Department, <IconDepartment />),
  ]),
  generateMenuItem("Profile", Path.Profile, <IconProfile />, [
    generateMenuItem("Document", Path.Document, <IconDocument />),
    generateMenuItem("Topology", Path.Topology, <IconTopology />),
  ]),
  generateMenuItem("Network", Path.Network, <IconNetwork />, [
    generateMenuItem("NetworkSummary", Path.Network_summary, <IconSummary />),
    generateMenuItem("NetworkType", Path.Network_type, <IconNetworkType />),
    generateMenuItem("IpAddress", Path.Ip_address, <IconIpAddress />),
    generateMenuItem("Liner", Path.Liner, <IconLiner />),
    generateMenuItem("Tel", Path.Tel, <IconTel />),
  ]),
  generateMenuItem("Device", Path.Device, <IconDevice />, [
    generateMenuItem("DeviceSummary", Path.Device_summary, <IconSummary />),
    generateMenuItem("Computer", Path.Computer, <IconComputer />),
    generateMenuItem(
      "OfficeEquipment",
      Path.Office_equipment,
      <IconOfficeEquipment />
    ),
    generateMenuItem(
      "NetworkDevice",
      Path.Network_device,
      <IconNetworkDevice />
    ),
    generateMenuItem("Server", Path.Server, <IconServer />),
    generateMenuItem("UsbKey", Path.Usb_key, <IconUsbKey />),
    generateMenuItem("DeviceBase", Path.Device_base, <IconDeviceBase />),
  ]),
  generateMenuItem("Message", Path.Message, <IconMessage />),
  generateMenuItem("Settings", Path.Settings, <IconSettings />),
];

const LeftSide = () => {
  const [expand, setExpand] = useState(true);

  console.log("left-side");

  return (
    <div
      className={`flex h-screen flex-col justify-between border-r bg-white dark:hover:text-gray-50 dark:text-gray-200 dark:bg-gray-800 w-transition ${
        expand ? "w-20" : "w-52"
      }`}
    >
      <div className="">
        {menuItem.map((item) => (
          <LeftSideItem {...item} expand={expand} key={item.to} />
        ))}
      </div>

      <LeftSideExpandItem
        icon={expand ? <IconChevronRight /> : <IconChevronLeft />}
        onClick={() => setExpand(!expand)}
      />
    </div>
  );
};

export default LeftSide;
