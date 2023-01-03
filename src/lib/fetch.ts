const url = `http://${window.location.hostname}`

const port = 8083
const path = '/phl'

const headers = new Headers()

headers.append('Content-Type', 'application/json')

const request = (data: Record<string, any>): RequestInit => {
	return {
		method: 'POST',
		body: JSON.stringify(data),
		headers,
	}
}

export interface Res<T = any> {
	success: boolean
	errmsg: string
	errcode: number
	data: T
}

export interface ErrorRes {
	errmsg: string
	errcode: number
}

export type FaildRes = Res & ErrorRes

export type SuccessRes<T = any> = Res & {}

export type Result<T> = {
	[x: string]: Res<T>
}

type Request = Record<string, any> | Record<string, any>[]

export const fetchData = async <T extends Request>(
	data: T
): Promise<T extends Record<string, any>[] ? Result<any>[] : Result<any>> => {
	return fetch(`${url}:${port}${path}`, request(data))
		.then((res) => res.ok && res.json())
		.catch((err) => fetchErrorResult(data))
}

// 当fetch出现错误时返回的数据，用以阻止解构失败
const fetchErrorResult = (
	query: Record<string, any> | Array<Record<string, any>>
) => {
	if (Array.isArray(query)) {
		const newQuery: any[] = query.map((q) => fetchErrorResult(q))

		return newQuery
	}

	return Object.fromEntries(
		Object.keys(query).map((key) => [
			key,
			{ success: false, errmsg: `网络连接失败或服务器无响应` },
		])
	)
}
