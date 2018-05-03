import {createStore, applyMiddleware} from 'redux'
import chatReducer from 'reducers/index'
import reduxThunk from 'redux-thunk'


const chatStore = createStore(
	chatReducer,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
	applyMiddleware(reduxThunk)
)

export default chatStore