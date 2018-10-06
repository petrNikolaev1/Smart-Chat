import React, {Component} from 'react'
import {Link} from 'react-router-dom'

import '@/assets/styles/Settings.scss'

export default class ChatWrap extends Component {
    render() {
        return (
            <div>
                <h1>
                    The settings screen is supposed to be here. For example, the possibility to change the interface
                    language is going to be implemented.
                </h1>
                <Link to="/">
                    <button>Back to main screen</button>
                </Link>
            </div>
        )
    }
}
