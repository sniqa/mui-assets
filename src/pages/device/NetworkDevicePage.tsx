import DeviceTable from '@comps/DeviceTable'
import { DeviceCategory } from '@lib/deviceBase'
import { PathMapEnum } from '@lib/path_map'

export default function NetworkDevicePage() {
	return (
		<DeviceTable
			pageTitle={PathMapEnum.Network_device}
			deviceCategory={DeviceCategory.NetDevice}
		/>
	)
}
