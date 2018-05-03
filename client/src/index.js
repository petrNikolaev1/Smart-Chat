import React from 'react'
import {render} from 'react-dom'
import App from 'containers/App'
import './assets/styles/style.scss'
import {AppContainer} from 'react-hot-loader'
import ws from 'util/ws'
window.ws = ws

const renderApp = Component => {
	render(
		<AppContainer>
			<Component/>
		</AppContainer>,
		document.querySelector('#mount_place')
	)
}

ws.emit(JSON.stringify({type: 'connected_new_observer'}))
renderApp(App)

// Hot module replacement
if (module.hot) {
	module.hot.accept('containers/App', () => {
		renderApp(App)
	})
}




