import constants from 'constants'


function getData(messages) {
	var result = []
	for (var i = 0; i < messages.length; i++) {
		var {data} = JSON.parse(messages[i])
		result.push(data)
	}
	return result
}

function disableEdit(messages, time) {
	for (var i = 0; i < messages.length; i++) {
		if (messages[i].time === time) {
			messages[i].editable = false
		}
	}
}

const messagesReducer = (state = [], action) => {

	var editedMessages = []

	switch (action.type) {

		case constants.RECEIVE_NEW_MESSAGE:
			return state.concat({
					text: action.text,
					author: action.author,
					time: action.time,
					color: action.color,
					to: action.to,
					edited: action.edited,
					editable: action.editable
				}
			);

		case constants.RECEIVE_EDITED:
			editedMessages = getData(action.data)
			return Array.from(editedMessages)

		case constants.DISABLE_EDIT:
			disableEdit(state, action.time)
			return Array.from(state)

		default:
			return state

	}
};

export default messagesReducer


