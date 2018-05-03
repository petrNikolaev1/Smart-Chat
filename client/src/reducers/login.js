import constants from 'constants'

const loginReducer = (state = [], action) => {
	switch (action.type) {
		case constants.AUTH:
			if (action.flag) return Array.of(true)
			return Array.of(false)
		default:
			return state
	}
};

export default loginReducer


