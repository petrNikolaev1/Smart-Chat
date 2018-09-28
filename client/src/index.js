import React from 'react'
import {render} from 'react-dom'
import ChatWrap from './containers/ChatWrap'
import {AppContainer} from 'react-hot-loader'
import {Provider} from 'react-redux'
import {PersistGate} from 'redux-persist/integration/react'

import ws from '@/util/ws'
import {getStoreObj} from "@/store";
import '@/assets/styles/chat.scss'
import '@/assets/styles/style.scss'

ws.emit(JSON.stringify({type: 'connected_new_observer'}));

const {store, persistor} = getStoreObj();

const renderApp = Component => {
    render(
        <AppContainer>
            <Provider key={module.hot ? Date.now() : store} store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <Component/>
                </PersistGate>
            </Provider>
        </AppContainer>,
        document.querySelector('#mount_place')
    )
};

renderApp(ChatWrap);

// Hot module replacement
if (module.hot) {
    module.hot.accept('./containers/ChatWrap', () => {
        renderApp(ChatWrap)
    })
}