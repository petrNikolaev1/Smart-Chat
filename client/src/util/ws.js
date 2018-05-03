import {connectedNewUser, disconnectedUser, receiveNewMessage, rejectAuth,
	receiveEdited, disableEdit, publicTyping, privateTyping} from 'actions'
import store from 'store'
import ReconnectingWebSocket from 'reconnecting-websocket';

/*
Websocket on the client side.
 */

export default ((wsUrl) => {
	let ws
	const {dispatch} = store

	// For reconnecting in case of a server failure
	ws = new ReconnectingWebSocket(wsUrl, null, {debug: true, reconnectInterval: 3000});


	ws.onopen = () => {
		// console.log('WS Open!')
	}

	ws.onmessage = (message) => {
		const messageObj = JSON.parse(message.data)
		// console.log('ws message: ', messageObj)
		switch (messageObj.type) {
			case 'connected_new_user':
				dispatch(connectedNewUser(messageObj))
				break;
			case 'disconnected_user':
				dispatch(disconnectedUser(messageObj.userID))
				break;
			case 'message':
				dispatch(receiveNewMessage(messageObj.data))
				break;
			case 'auth':
				dispatch(rejectAuth(messageObj.flag));
				break;
			case 'editing':
				dispatch(receiveEdited(messageObj.data));
				break;
			case 'disable_edit':
				dispatch(disableEdit(messageObj.time));
				break;
			case 'public_typing':
				dispatch(publicTyping(messageObj));
				break
			case 'private_typing':
				dispatch(privateTyping(messageObj))
				break;
		}
	}

	let countReconnect = 0

	const emit = (message) => {
		if (countReconnect > 5) return
		if (ws.readyState === ws.CONNECTING) {
			setTimeout(() => {
				emit(message)
				countReconnect++

			}, 500)
			return
		}
		ws.send(message)
		countReconnect = 0
	}

	return {emit}

})('ws://localhost:3000')