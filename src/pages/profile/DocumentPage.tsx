import CustomTable from '@comps/CustomTable'
import CustomUpload from '@comps/CustomUpload'
import { fetchData } from '@lib/fetch'
import { message } from '@lib/MessageContainer'
import { SWRUniqueKey } from '@lib/swrKey'
import { MRT_ColumnDef } from 'material-react-table'
import { useCallback, useState } from 'react'
import useSWR from 'swr'

const columns: MRT_ColumnDef<any>[] = []

// 获取数据
const getData = async () => {
	const { find_documents } = await fetchData({
		find_documents: {},
	})

	console.log(find_documents)

	const { success, data, errmsg } = find_documents

	return success ? data : (message.error(errmsg), undefined)
}

export default function DocumentPage() {
	const [openUpload, setOpenUpload] = useState(false)

	const { data } = useSWR(SWRUniqueKey.Documents, getData)

	return (
		<>
			<CustomTable
				columns={columns}
				data={data}
				onUpload={useCallback(() => setOpenUpload(true), [])}
			/>

			<CustomUpload
				open={openUpload}
				onCancel={useCallback(() => setOpenUpload(false), [])}
			/>
		</>
	)
}
