import DeviceTable from '@comps/DeviceTable'
import { DeviceCategory } from '@lib/deviceBase'
import { PathMapEnum } from '@lib/path_map'

export default function ComputerPage() {
	return (
		<DeviceTable
			pageTitle={PathMapEnum.Computer}
			deviceCategory={DeviceCategory.Computer}
		/>
	)
}
