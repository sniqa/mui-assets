import CustomTable from '@comps/CustomTable'
import CustomUpload from '@comps/CustomUpload'
import { fetchData } from '@lib/fetch'
import { message } from '@lib/MessageContainer'
import { PathMap } from '@lib/path_map'
import { SWRUniqueKey } from '@lib/swrKey'
import type { TelInfo } from '@lib/types'
import { MRT_ColumnDef } from 'material-react-table'
import { useCallback, useState } from 'react'
import useSWR from 'swr'

const columns: MRT_ColumnDef<TelInfo>[] = []

// 获取数据
const getData = async () => {
	const { find_tels } = await fetchData({ find_tels: {} })

	const { success, data, errmsg } = find_tels

	return success ? data : (message.error(errmsg), undefined)
}

export default function TelPage() {
	const [openUpload, setOpenUpload] = useState(false)

	const handleCloseUpload = useCallback(() => setOpenUpload(false), [])

	const handleOpenUpload = useCallback(() => setOpenUpload(true), [])

	const { data } = useSWR(SWRUniqueKey.Tels, getData)

	return (
		<>
			<div className="h-16 bg-white mb-4 text-2xl px-4 flex items-center">
				{PathMap.Tel}
			</div>

			<div className="px-4">
				<CustomTable<TelInfo>
					columns={columns}
					data={data}
					onUpload={handleOpenUpload}
				/>

				<CustomUpload open={openUpload} onCancel={handleCloseUpload} />
			</div>
		</>
	)
}
