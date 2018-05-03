import constants from 'constants'

const markedMessageReducer = (state = null, action) => {

	switch (action.type) {

		case 'MARK_MESSAGE':
			return new Object({markedId: action.id, flag: action.flag, styles: {animation: "color-me-in 5s"}})

		default:
			state = null
			return state
	}
};

export default markedMessageReducer


