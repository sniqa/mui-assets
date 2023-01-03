import { Layout } from 'antd'
import { useState } from 'react'

const { Header, Sider, Content } = Layout

interface MainLayoutProps {
	leftSide: JSX.Element
	contentHeader?: JSX.Element
	content: JSX.Element
}

const MainLayout = ({ leftSide, contentHeader, content }: MainLayoutProps) => {
	const [collapsed, setCollapsed] = useState(true)

	return (
		<Layout className="w-sreen h-screen">
			<Sider
				collapsible
				collapsed={collapsed}
				onCollapse={(val) => setCollapsed(val)}
			>
				{leftSide}
			</Sider>

			<Layout>
				{contentHeader && <Header>{contentHeader}</Header>}
				<Content>{content}</Content>
			</Layout>
		</Layout>
	)
}

export default MainLayout
