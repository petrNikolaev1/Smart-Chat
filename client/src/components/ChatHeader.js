import React, {Component} from 'react'
import {Settings} from '@material-ui/icons'

import constants from '@/constants'
import '@/assets/styles/ChatHeader.scss'

import {Link} from 'react-router-dom'

const TYPING_NUM = 4

export default class UserItem extends Component {

    getUserName() {
        var name = this.props.name
        return (name !== constants.MAIN_PUBLIC_CHAT) ? `Private Chat with @${name}` : 'Main Public Chat'
    }

    getTypingInfo(typingArr) {
        if (!typingArr) return ''

        if (typingArr.private) {
            if (!typingArr.flag) return ''
            return `#{${typingArr.from}} is typing...`
        }

        var resultArr = []
        for (var i = 0; i < typingArr.length; i++) {
            if (typingArr[i].flag === true) {
                resultArr.push(
                    `#{${typingArr[i].from}}`
                )
            }
        }
        var len = resultArr.length
        var resultString = resultArr.join(', ')
        if (len === 1) {
            resultString += ' is typing...'
        } else if (len > 1 && len <= TYPING_NUM) {
            resultString += ' are typing...'
        } else if (len > TYPING_NUM)
            resultString = resultArr.splice(0, TYPING_NUM).join(', ') + ` and ${len - TYPING_NUM} more are typing...`
        return resultString
    }

    render() {
        return (
            <div className="chat-header">
                <div className='chat-header-info'>
                    <div id="test" className="chat-header-name">
                        {this.getUserName()}
                    </div>
                    <div className='chat-header-typing'>
                        {/*{this.getTypingInfo(this.props.typing)}*/}
                    </div>
                </div>
                <div className='chat-header-settings'>
                    <Link to={'/settings/'}><Settings/></Link>
                </div>
            </div>
        )
    }
}



