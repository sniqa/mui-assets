import DeviceTable from '@comps/DeviceTable'
import { DeviceCategory } from '@lib/deviceBase'
import { PathMapEnum } from '@lib/path_map'

export default function OfficeEquipmentPage() {
	return (
		<DeviceTable
			pageTitle={PathMapEnum.Office_equipment}
			deviceCategory={DeviceCategory.OfficeEquipment}
		/>
	)
}
