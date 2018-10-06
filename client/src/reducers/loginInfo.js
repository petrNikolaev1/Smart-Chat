import constants from '@/constants'

const loginInfoReducer = (state = null, action) => {
	switch (action.type) {
		case constants.LOGIN_INFO:
			return action.username
		default:
			return state
	}
};

export default loginInfoReducer


