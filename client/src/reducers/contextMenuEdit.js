import constants from '../constants'

const chatControlEditReducer = (state = {flag: false, id: null, data: null} , action) => {

	switch (action.type) {

		case 'CONTEXT_MENU_EDIT':
			return new Object({flag: action.flag, id: action.id, data: action.data})

		default:
			return state
	}
};

export default chatControlEditReducer


