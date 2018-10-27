import React, {Component} from 'react'
import {Close} from '@material-ui/icons'

import ws from '@/util/ws'
import constants from '@/constants'
import '@/assets/styles/ChatControl.scss'
import pencil from '@/assets/img/pencil.svg'

/*
Component responsible for interactions with the Text Area
and Send Button which are logically independent for each chat.
 */

const TYPING_TIME = 3000;
const EDITED_LEN = 55;

export default class ChatControl extends Component {

    constructor() {
        super();
        this.allowPress = true
    }

    send(to, {messageId, editFlag, editedText}) {
        const textArea = document.getElementById('myTextArea');
        if (!textArea.value || !textArea.value.trim().length || (editFlag && editedText === textArea.value)) {
            // If a user entered nothing or made no changes while editing, sending message is rejected.
            return
        }
        this.props.handleChatControlContent(to, '', null, false, '');

        if (editFlag) {
            ws.emit(JSON.stringify({type: 'edit_message', data: textArea.value, messageId, to}))

        } else if (to === constants.MAIN_PUBLIC_CHAT) {
            ws.emit(JSON.stringify({type: 'send_message', data: textArea.value}))

        } else {
            ws.emit(JSON.stringify({type: 'send_private_message', data: textArea.value, to}))
        }

        ws.emit(JSON.stringify({type: 'typing_message', to, flag: false}));
        this.allowPress = true;
        textArea.value = ''
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.chatControlContent) {
            const {id, textArea, messageId, editFlag} = nextProps.chatControlContent;
            document.getElementById('myTextArea').value = textArea
        }
    }

    shouldComponentUpdate(nextProps) {
        if (nextProps.chatControlContent) {
            return true
        }
        return false
    }

    onEnterPress(e, to, chatControlContent) {
        if (e.keyCode === 13 && e.shiftKey === false) {
            e.preventDefault();
            this.send(to, chatControlContent)
        }
    }

    typingHandle(to) {
        if (this.allowPress) {
            this.allowPress = false;
            ws.emit(JSON.stringify({type: 'typing_message', to, flag: true}));
            setTimeout(() => {
                ws.emit(JSON.stringify({type: 'typing_message', to, flag: false}));
                this.allowPress = true
            }, TYPING_TIME)
        }
    }

    editedTextValidator(editedText) {
        if (editedText.length > EDITED_LEN) {
            return editedText.slice(0, EDITED_LEN) + '...'
        }
        return editedText
    }

    editForm() {
        const {id, textArea, messageId, editFlag, editedText} = this.props.chatControlContent;
        return (
            <div className="edit">
                <div className='edit-icon'><img src={pencil} alt='edit'/></div>
                <div className='edit-info-container'>
                    <div className='edit-info' onClick={() => this.props.handleMarkedMessage(messageId, true)}>
                        <div className='edit-info-label'>Edit message:</div>
                        <div className="edit-info-value">{(editedText)}</div>
                    </div>
                </div>
                <div onClick={() => {
                    document.getElementById('myTextArea').value = '';
                    this.props.handleChatControlContent(id, document.getElementById('myTextArea').value, messageId, false)
                }} className="edit-close"><Close/>
                </div>
            </div>
        )
    }

    render() {
        const {to, chatControlContent} = this.props;
        return (
            <div className="chat-control">
                {this.props.chatControlContent && this.props.chatControlContent.editFlag ? this.editForm() : null}
                <textarea onKeyPress={() => this.typingHandle(to)} id="myTextArea" placeholder="Type your message"
                          rows="4"
                          onKeyDown={(e) => this.onEnterPress(e, to, chatControlContent)}/>
                <button onClick={() => this.send(to, chatControlContent)}>Send</button>
            </div>
        )
    }
}
