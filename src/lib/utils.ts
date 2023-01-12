type UseChildToParent<T = any> = [
	childHook: (cd: () => T) => void,

	parentHook: () => T | null
]

// 子组件传值给父组件
// export const useChildToParent = <T>(): UseChildToParent<T> => {
// 	const [value, setValue] = useState< T | null>(null)

// 	const parentHook = useCallback(() => value, [value])

// 	return [setValue, parentHook]
// }

// export const useChildToParent = <T>(): UseChildToParent<T> => {
// 	let value: T | null = null

// 	const parentHook = () => value

// 	const childHook = (data: T) => {
// 		value = data
// 	}

// 	return [childHook, parentHook]
// }

// 子组件传值给父组件
export const useChildToParent = <T>() => {
	let callback: () => T

	const childHook = (cb: () => T) => {
		callback = cb
	}

	const parentHook = () => callback()

	return {
		childHook,
		parentHook,
	}
}
