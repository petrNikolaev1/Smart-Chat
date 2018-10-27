import omit from 'object.omit'

import constants from '@/constants'

const loginReducer = (state = {}, action) => {
    switch (action.type) {
        case constants.LOGIN_REQUEST:
            return {...state, loaded: false};
        case constants.LOGIN_SUCCESS:
            return {...omit(state, 'error'), loaded: true, res: action.result};
        case constants.LOGIN_ERROR:
            return {...omit(state, 'res'), loaded: true, error: action.error};
        default:
            return state;
    }
};

export default loginReducer


