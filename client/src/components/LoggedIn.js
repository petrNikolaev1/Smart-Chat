import React, {Component} from 'react'

import '@/assets/styles/LoggedIn.scss'

export default class LoggedIn extends Component {
    render() {
        const {username} = this.props;
        return (
            <div className='logged-in'>
                <div className='logged-in-username'>
                    {`Login: @${username}`}
                </div>
            </div>
        )
    }
}

