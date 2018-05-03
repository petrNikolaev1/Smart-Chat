import constants from 'constants'

function updateState(state, from, flag) {
	for (var i = 0; i < state.length; i++) {
		if (state[i].from === from) {
			console.log('index found', i)
			state[i].flag = flag
			return Array.from(state)
		}
	}
	console.log('index not found')
	return state.concat({from, flag});
}

const typingReducer = (state = [], action) => {

	switch (action.type) {

		case constants.PRIVATE_TYPING:
			return updateState(state, action.from, action.flag)

		default:
			return state

	}
};

export default typingReducer


