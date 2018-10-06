import React, {Component} from 'react'

import main from '@/assets/img/main.svg'
import constants from '@/constants'
import '@/assets/styles/UserItem.scss'

/*
Component representing a user.
 */

export default class UserItem extends Component {

    publicChatItem = (username, handleChatWith) => {
        return (
            <li onClick={() => handleChatWith(username)}>
                <div className='user-avatar'>
                    <img src={main} alt="avatar"/>
                </div>
                <div className="user-about">
                    <div className="user-about-name"> Main Public Chat</div>
                </div>
            </li>
        )
    };

    userItem = (username, handleChatWith, id) => {
        return (
            <li onClick={() => handleChatWith(username)}>
                <div className='user-avatar'>
                    <img src={this.getAvatar(id)} alt="avatar"/>
                </div>
                <div className="user-about">
                    <div className="user-about-name"> {username} </div>
                    <div className="user-about-status">
                        <span className="user-about-status-online"/> online
                    </div>
                </div>
            </li>
        )
    }

    render() {
        const {id, username, handleChatWith} = this.props

        if (username === constants.MAIN_PUBLIC_CHAT) {
            return this.publicChatItem(username, handleChatWith)
        } else {
            return this.userItem(username, handleChatWith, id)
        }
    }

    getAvatar = (id) => {
        return require(`../assets/img/avatar${id % 7}.svg`)
    }
}