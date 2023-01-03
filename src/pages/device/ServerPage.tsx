import DeviceTable from '@comps/DeviceTable'
import { DeviceCategory } from '@lib/deviceBase'
import { PathMapEnum } from '@lib/path_map'

export default function ServerPage() {
	return (
		<DeviceTable
			pageTitle={PathMapEnum.Server}
			deviceCategory={DeviceCategory.Server}
		/>
	)
}
