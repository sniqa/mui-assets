import { IconSearch } from '@comps/FontAwesomeSvgs'
import { HamsterLoading } from '@comps/Loading'
import ProfileCard from '@comps/ProfileCard'
import { fetchData } from '@lib/fetch'
import { Path } from '@lib/path_map'
import { SWRUniqueKey } from '@lib/swrKey'
import { DocumentInfoWithId } from '@lib/types'
import { Button, IconButton, InputBase, Tooltip } from '@mui/material'
import { Suspense, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import useSWR from 'swr'

const Document = () => {
	const [searchText, setSearchText] = useState('')

	const ref = useRef<HTMLInputElement | null>(null)

	const { data: documents } = useSWR<DocumentInfoWithId[]>(
		[SWRUniqueKey.Documents, searchText],
		async () => {
			const { find_document_fuzzy } = await fetchData({
				find_document_fuzzy: searchText,
			})

			const { success, data, errmsg } = find_document_fuzzy

			return success ? data : []
		}
	)

	return (
		<Suspense fallback={<HamsterLoading />}>
			<div className="flex justify-between items-center border-b h-12  px-4 bg-white">
				<section>
					<Link to={Path.DocumentCreate}>
						<Button variant="contained" disableElevation>{`新建文档`}</Button>
					</Link>
				</section>

				<section className="border border-blue-400 border-solid px-1 box-border rounded flex items-center">
					<InputBase
						size={`small`}
						type={`search`}
						placeholder={`搜索`}
						className={`pt-1 box-border`}
						inputRef={ref}
					/>

					<Tooltip title={`搜索`}>
						<IconButton
							size={`small`}
							onClick={() => setSearchText(ref.current?.value || '')}
						>
							<IconSearch />
						</IconButton>
					</Tooltip>
				</section>
			</div>

			<div
				className={`flex flex-row content-start flex-wrap flex-start h-document-content overflow-auto my-2 px-2`}
			>
				{documents?.map((document) => (
					<ProfileCard
						key={document._id}
						to={document._id}
						title={document.title}
						description={document.description}
						create_timestamp={document.create_timestamp}
						last_modify_timestamp={document.last_modify_timestamp}
					/>
				))}
			</div>
		</Suspense>
	)
}

export default Document
