import {combineReducers} from 'redux'

import messagesReducer from './messages'
import peopleReducer from './people'
import loginReducer from './login'
import contextMenuOpenReducer from './contextMenuOpen'
import contextMenuEditReducer from './contextMenuEdit'
import markEditedMessageReducer from './markEditedMessage'
import chatControlContentReducer from './chatControlContent'
import markedMessageReducer from './markedMessage'
import publicTypingReducer from './publicTyping'
import privateTypingReducer from './privateTyping'
import loginInfoReducer from './loginInfo'
import chatWithReducer from './chatWith'

const chatReducer = combineReducers({
	loginReducer,
	peopleReducer,
	messagesReducer,
	contextMenuOpenReducer,
	contextMenuEditReducer,
	markEditedMessageReducer,
	chatControlContentReducer,
	markedMessageReducer,
	publicTypingReducer,
	privateTypingReducer,
	loginInfoReducer,
	chatWithReducer
});

export default chatReducer

