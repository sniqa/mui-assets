import type { Res } from '@lib/fetch'
import type { UserInfo } from '@lib/types'

interface FetchApis {
	find_users: (user: Partial<UserInfo>) => Promise<any>
	create_user: (user: Partial<UserInfo>) => Promise<any>
	delete_user: (user: Partial<UserInfo>) => Promise<any>
	modify_user: (user: Partial<UserInfo>) => Promise<any>
	delete_many_users_by_ids: (ids: string[]) => Promise<Res<number>>

	create_department: () => Promise<any>
	find_departments: () => Promise<any>
	delete_department: () => Promise<any>
	delete_many_departments_by_ids: (ids: string[]) => Promise<any>
	modify_department: () => Promise<any>

	create_document: () => Promise<any>
	find_documents: () => Promise<any>
	find_document_by_id: (id: string) => Promise<any>
	delete_document_by_id: (id: string) => Promise<any>

	create_document_history: () => Promise<any>
	find_document_history_by_id: () => Promise<any>

	find_ips: () => Promise<any>

	create_network_type: () => Promise<any>
	find_network_types: () => Promise<any>
	delete_network_type: () => Promise<any>

	find_logs: () => Promise<any>
	delete_many_logs_by_ids: (ids: string[]) => Promise<any>
	delete_log: () => Promise<any>

	create_device_base: () => Promise<any>
	find_device_bases: () => Promise<any>
	modify_device_base: () => Promise<any>
	delete_device_base: () => Promise<any>
	delete_many_device_base_by_ids: (ids: string[]) => Promise<any>

	create_device: () => Promise<any>
	find_devices: () => Promise<any>
	delete_device: () => Promise<any>
	delete_many_device_by_ids: (ids: string[]) => Promise<any>
	modify_device: () => Promise<any>
}
