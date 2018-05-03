import React, {Component} from 'react'

/*
Component becomes visible when the user is authorized.
 */

export default class LogedIn extends Component{
	getUserName() {
		return `Login: #{${this.props.username}}`
	}
	render() {
		return (
			<div className='chat-user'>{this.getUserName()}</div>
		)
	}
}

