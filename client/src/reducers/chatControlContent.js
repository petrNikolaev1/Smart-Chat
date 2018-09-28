import constants from '@/constants'

function findIndexById(state, id) {
	for (var i = 0; i < state.length; i++) {
		if (state[i].id === id)
			return i
	}
	return -1
}

const initState = [{id: constants.MAIN_PUBLIC_CHAT, textArea: '', messageId: null, editFlag: false}]

const chatControlContentReducer = (state = initState, action) => {
	let newElement = {
		id: action.id,
		textArea: action.textArea,
		messageId: action.messageId,
		editFlag: action.editFlag,
		editedText: action.editedText
	};
	switch (action.type) {
		case 'CHAT_CONTROl_CONTENT':
			var index = findIndexById(state, action.id);
			if (index !== -1) {
				state[index] = newElement
				return Array.from(state)
			} else {
				return state.concat(newElement)
			}

		default:
			return state
	}
};

export default chatControlContentReducer

