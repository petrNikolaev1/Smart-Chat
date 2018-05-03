import React, {Component} from 'react'

/*
Component representing authorization field.
 */

export default class Login extends Component {

	auth(handleLogin) {
		const name = document.getElementById('login').value
		if (!name || !name.trim().length) {
			return
		}
		document.getElementById('login').value = ''
		handleLogin(name)
	}

	onEnterPress(e, handleLogin) {
		if (e.keyCode === 13 && e.shiftKey === false) {
			e.preventDefault();
			this.auth(handleLogin)
		}
	}

	render() {
		const {handleLogin} = this.props
		return (
			<div className="login">
				<input
					onKeyDown={(e) => this.onEnterPress(e, handleLogin)}
					id="login" type="text" placeholder="Type your name"/>
				{/*<br/>*/}
				<button onClick={() => this.auth(handleLogin)} type="button">Log in</button>
			</div>
		)
	}
}



