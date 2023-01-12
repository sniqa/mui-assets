import MessageContainer from '@lib/MessageContainer'
import { App as AppContainer } from 'antd'
import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
// import '@styles/all.min.css'
import { StyleProvider } from '@ant-design/cssinjs'
import '@styles/index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		{/* <ConfigProvider
			theme={{
				token: {},
			}}
		> */}
		<StyleProvider
			hashPriority="high"
			// transformers={[legacyLogicalPropertiesTransformer]}
		>
			<AppContainer>
				<MessageContainer />
				<App />
			</AppContainer>
		</StyleProvider>
		{/* </ConfigProvider> */}
	</React.StrictMode>
)
