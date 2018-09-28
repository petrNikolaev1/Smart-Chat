/*
Redux store.
 */

import {createStore, applyMiddleware} from 'redux'
import rootReducer from '../reducers/index'
import reduxThunk from 'redux-thunk'
import {persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
// defaults to localStorage for web and AsyncStorage for react-native

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

let storeObj = null;

const initStore = () => {
    storeObj = {};
    storeObj.store = createStore(persistedReducer,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
        applyMiddleware(reduxThunk));
    storeObj.persistor = persistStore(storeObj.store);

    if (module.hot) {
        module.hot.accept(() => {
            // This fetch the new state of the above reducers.
            const nextRootReducer = require('../reducers/index');
            storeObj.store.replaceReducer(
                persistReducer(persistConfig, nextRootReducer)
            )
        })
    }

    return storeObj
};

const getStoreObj = () => {
    if (!storeObj) initStore();
    return storeObj;
};

export {getStoreObj, initStore}