import React, {Component} from 'react'
import main from '../assets/img/main.svg'
import constants from 'constants'

/*
Component representing a user.
 */

export default class UserItem extends Component {

	publicChatItem = (username, handleChatWith) => {
		return (
			<li onClick={() => handleChatWith(username)} className="clearfix">
				<img src={main}
					 alt="avatar"/>
				<div className="about">
					<  div className="name"> Main Public Chat</div>
				</div>
			</li>
		)
	}

	userItem = (username, handleChatWith, id) => {
		return (
			<li onClick={() => handleChatWith(username)} className="clearfix">
				<img src={this.getAvatar(id)}
					 alt="avatar"/>
				<div className="about">
					<  div className="name"> {username} </div>
					<div className="status">
						<i className="fa fa-circle online"></i> online
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