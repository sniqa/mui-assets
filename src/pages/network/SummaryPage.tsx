import CustomTable from '@comps/CustomTable'
import CustomUpload from '@comps/CustomUpload'
import { PathMap } from '@lib/path_map'
import { MRT_ColumnDef } from 'material-react-table'
import { useCallback, useState } from 'react'

const columns: MRT_ColumnDef<any>[] = []
const data: any[] = []

export default function SummaryPage() {
	const [openUpload, setOpenUpload] = useState(false)

	return (
		<>
			<div className="h-16 bg-white mb-4 text-2xl px-4 flex items-center">
				{PathMap.Network_summary}
			</div>

			<div className="px-4">
				<CustomTable
					columns={columns}
					data={data}
					onUpload={useCallback(() => setOpenUpload(true), [])}
				/>

				<CustomUpload
					open={openUpload}
					onCancel={useCallback(() => setOpenUpload(false), [])}
				/>
			</div>
		</>
	)
}
