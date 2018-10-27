import React, {Component} from 'react'

import '@/assets/styles/Login.scss'
import {UsernameInput} from "@/common/Input";

export default class Login extends Component {

    state = {
        username: ''
    };

    handleUsername = username => this.setState({username});

    submitUsername = event => {
        event.preventDefault();
        const {valid, value} = this.state.username;
        valid && this.props.handleLogin(value)
    };

    render() {
        const {username} = this.state;

        return (
            <form className="login" onSubmit={this.submitUsername}>
                <UsernameInput
                    value={username}
                    handleChange={this.handleUsername}
                    ref={input => this.input = input}
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



