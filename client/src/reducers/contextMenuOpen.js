import constants from 'constants'

const contextMenuOpenReducer = (state = 0, action) => {

	switch (action.type) {

		case 'CONTEXT_MENU_MESSAGE_ID':
			return new Number(action.id)

		default:
			return state
	}
};

export default contextMenuOpenReducer


