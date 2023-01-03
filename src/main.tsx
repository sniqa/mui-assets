import MessageContainer from '@lib/MessageContainer'
import { App as AppContainer, ConfigProvider } from 'antd'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

// import '@styles/all.min.css'
import '@styles/index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<ConfigProvider
			theme={{
				token: {},
			}}
		>
			<AppContainer>
				<MessageContainer />
				<App />
			</AppContainer>
		</ConfigProvider>
	</React.StrictMode>
)
