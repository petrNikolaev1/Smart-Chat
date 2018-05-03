import constants from 'constants'

// Action Creators

export const markMessage = (id, flag) => {
	return (dispatch) => {
		dispatch({
			type: 'MARK_MESSAGE',
			id, flag
		})
	}
}

export const contextMenuOpen = (id) => {
	return (dispatch) => {
		dispatch({
			type: 'CONTEXT_MENU_MESSAGE_ID',
			id
		})
	}
}

export const contextMenuEdit = (flag, id, data) => {
	return (dispatch) => {
		dispatch({
			type: 'CONTEXT_MENU_EDIT',
			flag, id, data
		})
	}
}

export const chatControlContent = (id, textArea, messageId, editFlag, editedText) => {
	// console.log("ACTION", id, textArea, messageId, editFlag)
	return (dispatch) => {
		dispatch({
			type: 'CHAT_CONTROl_CONTENT',
			id, textArea, messageId, editFlag, editedText
		})
	}
}

export const markEditedMessage = (flag) => {
	return (dispatch) => {
		dispatch({
			type: 'MARK_EDITED_MESSAGE',
			flag
		})
	}
}


export const connectedNewUser = ({userID, username}) => {
	return {
		type: constants.CONNECTED_NEW_USER,
		userID,
		username
	}
}

export const rejectAuth = (flag) => {
	return {
		type: constants.AUTH,
		flag
	}
}

export const disconnectedUser = (userID) => {
	return {
		type: constants.DISCONNECTED_USER,
		userID
	}
}

export const receiveNewMessage = ({text, author, time, color, to, edited, editable}) => {
	return {
		type: constants.RECEIVE_NEW_MESSAGE,
		author, text, time, color, to, edited, editable
	}
}

export const receiveEdited = (data) => {
	return {
		type: constants.RECEIVE_EDITED,
		data
	}
}

export const disableEdit = (time) => {
	return {
		type: constants.DISABLE_EDIT,
		time
	}
}

export const publicTyping = ({from, flag}) => {
	return {
		type: constants.PUBLIC_TYPING,
		from, flag
	}
}

export const privateTyping = ({from, flag}) => {
	return {
		type: constants.PRIVATE_TYPING,
		from, flag
	}
}

export const loginInfo = (username) => {
	return {
		type: constants.LOGIN_INFO,
		username
	}
}

export const chatWith = (username) => {
	return {
		type: constants.CHAT_WITH,
		username
	}
}

