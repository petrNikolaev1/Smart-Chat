import React, {Component} from 'react'
import {Provider} from 'react-redux'
import store from 'store/index'
import ChatWrap from './ChatWrap'
window.store = store

export default class App extends Component {
	render() {
		return (
			<Provider key={module.hot ? Date.now() : store} store={store}>
				<div onContextMenu={(event) => {
					// Disabling default context menu for convenient interface
					event.preventDefault()
				}} className="container clearfix">
					<ChatWrap/>
				</div>
			</Provider>
		)
	}
}