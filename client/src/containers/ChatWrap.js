import React, {Component} from 'react'
import {connect} from 'react-redux';

import PeopleList from '@/containers/PeopleList'
import MessagesList from '@/containers/MessagesList'
import Login from '@/components/Login';
import ws from '@/util/ws'
import LoggedIn from '@/components/LoggedIn';
import constants from '@/constants'
import {loginInfo, chatWith} from '@/actions'
import '@/assets/styles/ChatWrap.scss'
import {wsAction} from "@/actions/wsActions";

/*
Chat-wrapper Container that contains both PeopleList and MessagesList.
Controls a chat change so that when a user is chosen from the PeopleList
the corresponding info is displayed in the MessagesList.
 */

@connect(store => ({
        login: store.loginReducer,
        username: store.loginInfoReducer,
        chatWith: store.chatWithReducer
    }), {
        handleLoginInfo: loginInfo,
        handleChatWith: chatWith,
        wsAction
    }
)
export default class ChatWrap extends Component {

    constructor() {
        super();
        this.tryUsername = null
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.login[0] === false) {
            alert('This username is already taken, please chose another one!');
            return;
        } else if (nextProps.login[0] === true && nextProps.login !== this.props.login) {
            localStorage.setItem('auth', this.tryUsername);
            this.props.handleLoginInfo(this.tryUsername)
        }
    }

    render() {
        const {login} = this.props;
        console.log('RENDER', login)

        return (
            <div className='chat-wrap'>
                <div className='chat-wrap-left'>
                    {this.props.username ? <LoggedIn username={this.props.username}/> :
                        <Login handleLogin={this.handleLogin.bind(this)}/>}
                    <PeopleList handleChatWith={this.handleChatWith.bind(this)}
                                chatWith={this.props.chatWith}
                    />
                </div>
                <div className='chat-wrap-right'>
                    <MessagesList username={this.props.username ? this.props.username : null}
                                  chatWith={this.props.chatWith}/>
                </div>
            </div>
        )
    }

    handleChatWith = (username) => {
        if (!this.props.username && username !== constants.MAIN_PUBLIC_CHAT) {
            alert('You need to log in in order to access private chats!');
            return
        }
        if (this.props.chatWith === username) {
            return
        }
        this.props.handleChatWith(username)
    };


    handleLogin = (username) => {
        this.tryUsername = username;
        // ws.emit(JSON.stringify({type: 'connected_new_user', data: username}));
        this.props.wsAction({actionType: constants.LOGIN_REQUEST, wsType: 'connected_new_user', wsData: username})
    }
}
