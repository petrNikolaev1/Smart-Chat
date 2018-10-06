import React, {Component} from 'react'

import '@/assets/styles/Login.scss'

export default class Login extends Component {

    auth = (event, handleLogin) => {
        event.preventDefault();
        const name = this.input.value;
        if (!name || !name.trim().length) {
            return
        }
        this.input.value = '';
        handleLogin(name)
    };

    render() {
        const {handleLogin} = this.props;
        return (
            <form className="login" onSubmit={(event) => this.auth(event, handleLogin)}>
                <input
                    ref={input => this.input = input}
                    type="text"
                    placeholder="Type your name"
                    className='login-input'
                />
                <button type="submit" className='login-btn'>
                    Log in
                </button>
            </form>
        )
    }
}



