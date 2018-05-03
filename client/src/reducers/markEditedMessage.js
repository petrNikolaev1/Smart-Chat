import constants from 'constants'

const markEditedMessageReducer = (state = false, action) => {

	switch (action.type) {

		case 'MARK_EDITED_MESSAGE':
			return true

		default:
			state = false
			return state
	}
};

export default markEditedMessageReducer


