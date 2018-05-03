import constants from 'constants'

const chatWithReducer = (state = constants.MAIN_PUBLIC_CHAT, action) => {
	switch (action.type) {
		case constants.CHAT_WITH:
			return action.username
		default:
			return state
	}
};

export default chatWithReducer


