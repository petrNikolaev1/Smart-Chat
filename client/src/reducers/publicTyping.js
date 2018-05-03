import constants from 'constants'

function updateState(state, from, flag) {
	for (var i = 0; i < state.length; i++) {
		if (state[i].from === from) {
			state[i].flag = flag
			return Array.from(state)
		}
	}
	return state.concat({from, flag})
}

const typingReducer = (state = [], action) => {

	switch (action.type) {

		case constants.PUBLIC_TYPING:
			return updateState(state, action.from, action.flag)

		default:
			return state

	}
};

export default typingReducer


