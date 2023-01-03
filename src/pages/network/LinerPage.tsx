import CustomTable from '@comps/CustomTable'
import CustomUpload from '@comps/CustomUpload'
import { fetchData } from '@lib/fetch'
import { message } from '@lib/MessageContainer'
import { PathMap } from '@lib/path_map'
import { SWRUniqueKey } from '@lib/swrKey'
import type { LinerInfo } from '@lib/types'
import { MRT_ColumnDef } from 'material-react-table'
import { useCallback, useState } from 'react'
import useSWR from 'swr'

const columns: MRT_ColumnDef<LinerInfo>[] = []

// 获取数据
const getData = async () => {
	const { find_liners } = await fetchData({ find_liners: {} })

	const { success, data, errmsg } = find_liners

	return success ? data : (message.error(errmsg), undefined)
}

export default function LinerPage() {
	const [openUpload, setOpenUpload] = useState(false)

	const handleCloseUpload = useCallback(() => setOpenUpload(false), [])

	const handleOpenUpload = useCallback(() => setOpenUpload(true), [])

	const { data } = useSWR(SWRUniqueKey.Liner, getData)

	return (
		<>
			<div className="h-16 bg-white mb-4 text-2xl px-4 flex items-center">
				{PathMap.Liner}
			</div>

			<div className="px-4">
				<CustomTable<LinerInfo>
					columns={columns}
					data={data}
					onUpload={handleOpenUpload}
				/>

				<CustomUpload open={openUpload} onCancel={handleCloseUpload} />
			</div>
		</>
	)
}
