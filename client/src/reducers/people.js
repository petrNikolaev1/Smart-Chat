import constants from 'constants'

const initState = [{
	userID: Date.now(),
	username: constants.MAIN_PUBLIC_CHAT
}]

const peopleReducer = (state = initState, action) => {

	switch (action.type) {

		case constants.CONNECTED_NEW_USER:
			return state.concat({
					userID: action.userID,
					username: action.username
				}
			);

		case constants.DISCONNECTED_USER:
			return state.filter(user => {
				return user.userID !== action.userID
			});
		default:
			return state

	}
};


export default peopleReducer
