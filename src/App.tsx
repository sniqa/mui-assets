import LeftSide from '@comps/LeftSide'
import MainLayout from '@comps/MainLayout'
import { Path } from '@lib/path_map'
import HomePage from '@pages/HomePage'
import IndexPage from '@pages/IndexPage'
import _404Page from '@pages/_404Page'
import { Suspense } from 'react'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'

import { lazy } from 'react'

const AccountPage = lazy(() => import('@pages/user/AccountPage'))
const DepartmentPage = lazy(() => import('@pages/user/DepartmentPage'))

const DocumentPage = lazy(() => import('@pages/profile/DocumentPage'))
const TopologyPage = lazy(() => import('@pages/profile/TopologyPage'))

const NetworkSummaryPage = lazy(() => import('@pages/network/SummaryPage'))
const NetworkTypePage = lazy(() => import('@pages/network/NetworkTypePage'))
const IpAddressPage = lazy(() => import('@pages/network/IpAddressPage'))
const LinerPage = lazy(() => import('@pages/network/LinerPage'))
const TelPage = lazy(() => import('@pages/network/TelPage'))

const DeviceSummaryPage = lazy(() => import('@pages/device/SummaryPage'))
const ComputerPage = lazy(() => import('@pages/device/ComputerPage'))
const OfficeEquipmentPage = lazy(
	() => import('@pages/device/OfficeEquipmentPage')
)
const NetworkDevicePage = lazy(() => import('@pages/device/NetworkDevicePage'))
const ServerPage = lazy(() => import('@pages/device/ServerPage'))
const UsbKeyPage = lazy(() => import('@pages/device/UsbKeyPage'))
const DeviceBasePage = lazy(() => import('@pages/device/DeviceBasePage'))

const LogPage = lazy(() => import('@pages/message/LogPage'))

const router = createBrowserRouter([
	{
		path: Path.Root,
		element: <IndexPage />,
		errorElement: <_404Page />,
	},
	{
		path: Path.Root,
		element: (
			<MainLayout
				leftSide={<LeftSide />}
				content={
					<div
						className=""
						style={{
							background: '#f0f0f0',
						}}
					>
						<Suspense fallback={<>Loading...</>}>
							<Outlet />
						</Suspense>
					</div>
				}
			/>
		),
		errorElement: <_404Page />,
		children: [
			{ path: Path.Home, element: <HomePage /> },
			{ path: Path.Account, element: <AccountPage /> },
			{ path: Path.Department, element: <DepartmentPage /> },
			{ path: Path.Document, element: <DocumentPage /> },
			{ path: Path.Topology, element: <TopologyPage /> },
			{ path: Path.Network_summary, element: <NetworkSummaryPage /> },
			{ path: Path.Network_type, element: <NetworkTypePage /> },
			{ path: Path.Ip_address, element: <IpAddressPage /> },
			{ path: Path.Liner, element: <LinerPage /> },
			{ path: Path.Tel, element: <TelPage /> },
			{ path: Path.Device_summary, element: <DeviceSummaryPage /> },
			{ path: Path.Computer, element: <ComputerPage /> },
			{ path: Path.Office_equipment, element: <OfficeEquipmentPage /> },
			{ path: Path.Network_device, element: <NetworkDevicePage /> },
			{ path: Path.Server, element: <ServerPage /> },
			{ path: Path.Usb_key, element: <UsbKeyPage /> },
			{ path: Path.Device_base, element: <DeviceBasePage /> },
			{ path: Path.Device_base, element: <DeviceBasePage /> },
			{ path: Path.Device_base, element: <DeviceBasePage /> },
			{ path: Path.Message, element: <LogPage /> },
		],
	},
	{ path: '*', element: <_404Page /> },
])

const AppPage = () => {
	return <RouterProvider router={router} />
}

export default AppPage
