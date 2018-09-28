import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import ChatHeader from '@/components/ChatHeader'
import MessageItem from '@/components/MessageItem'
import ChatControl from '@/components/ChatControl'
import {contextMenuOpen, contextMenuEdit, markEditedMessage, chatControlContent, markMessage} from '@/actions'
import constants from '@/constants'

/*
Container that is responsible for representing chat appropriately:
in accordance with the chosen user and previously sent messages, typed data, etc...
 */

class MessagesList extends Component {

	constructor() {
		super()
		this.ul = null
		this.marked = null
		this.chatWrap = null
		this.shouldChatControlUpdate = true
		this.state = {
			class: null
		}
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		// When you send new message all the messages are scrolled down
		if (this.props.messages.length !== 0 && !this.isMessagesEqual(prevProps.messages, this.props.messages)) {
			if (this.props.messages.slice(-1)[0].author === this.props.username) {
				this.chatWrap.scrollTop = this.ul.scrollHeight
			}
		}

		if (this.marked && prevProps.markedMessage !== this.props.markedMessage) {
			const offset = -this.marked.scrollHeight + this.marked.offsetTop
			this.chatWrap.scrollTop = offset
		}
	}

	componentWillReceiveProps(nextProps) {
		this.shouldChatControlUpdate = true

		if (nextProps.markedMessage !== this.props.markedMessage) {
			this.setState({class: ''})
			setTimeout(() => {
				this.setState({class: 'marked-message'})
			}, 0)
		}

		if (nextProps.publicTyping !== this.props.publicTyping || nextProps.messages !== this.props.messages
			|| nextProps.privateTyping !== this.props.privateTyping) {
			this.shouldChatControlUpdate = false
		}


		const {id, textArea, messageId, editFlag, editedText} = this.findElementById(this.props.chatControlContent, this.props.chatWith)

		if (nextProps.chatWith !== this.props.chatWith) {
			this.props.handleContextMenuOpen(null)
			this.props.handleChatControlContent(this.props.chatWith, document.getElementById('myTextArea').value, messageId, editFlag, editedText)
		}

		if (editFlag === true && this.getMessageById(this.props.messages, messageId).editable === false) {
			// Disable editing if timeout
			this.props.handleChatControlContent(this.props.chatWith, document.getElementById('myTextArea').value, null, false, '')
		}

	}

	shouldComponentUpdate(nextProps) {
		if (nextProps.chatWith !== this.props.chatWith) return false
		else return true
	}


	render() {
		const {username} = this.props
		var msgs = this.props.messages
		if (this.props.chatWith !== constants.MAIN_PUBLIC_CHAT) {
			msgs = msgs.filter((m) => {
				return ((m.author === username && m.to === this.props.chatWith) ||
					(m.author === this.props.chatWith && m.to === username))
			})
		} else {
			msgs = msgs.filter((m) => {
				return (m.to === constants.MAIN_PUBLIC_CHAT)
			})
		}

		const content = this.findElementById(this.props.chatControlContent, this.props.chatWith)
		const mark = this.props.markedMessage

		return (
			<Fragment>
				<ChatHeader typing={this.props.chatWith === constants.MAIN_PUBLIC_CHAT ?
					this.props.publicTyping : this.getPrivateTypingInfo(this.props.chatWith)}
							name={this.props.chatWith}/>

				<div id='chat_history' className="chat-history" ref={chatWrap => this.chatWrap = chatWrap}
					 onScroll={(this.props.contextMenuMessageId != 0) ? this.props.handleContextMenuOpen.bind(this, null) : null}>
					<ul ref={ul => this.ul = ul}>
						{msgs.map(m => {
							return (
								<div ref={(mark && m.time == mark.markedId) ? marked => this.marked = marked : null}
									 key={m.time}
									 className={(mark && m.time == mark.markedId) ? this.state.class : ''}>
									< MessageItem
										{...m}
										username={username}
										handleContextMenuOpen={this.wrapperContextMenuOpen.bind(this, content)}
										isContextMenuVisible={this.props.contextMenuMessageId == m.time}
										// isContextMenuVisible={m.author === username && this.props.contextMenuMessageId == m.time}
										handleContextMenuEdit={this.wrapperContextMenuEdit.bind(this, m.text, m.time, true, m.text)}
										handleContextMenuReply={this.wrapperContextMenuReply.bind(this, m.author)}
									/>
								</div>
							)
						})}
					</ul>
				</div>
				{username ? <ChatControl
					to={this.props.chatWith}
					editingInfo={this.props.editingInfo}
					handleContextMenuEdit={this.props.handleContextMenuEdit}
					handleChatControlContent={this.props.handleChatControlContent}
					chatControlContent={this.shouldChatControlUpdate ? content : null}
					handleMarkedMessage={this.props.handleMarkedMessage}
				/> : null}
			</Fragment>
		)
	}

	wrapperContextMenuOpen({messageId, editFlag, editedText}, contextMenuMessageId,) {
		const textArea = document.getElementById('myTextArea')
		let text = ''
		if (textArea) {
			text = textArea.value
		}
		this.props.handleChatControlContent(this.props.chatWith, text, messageId, editFlag, editedText)
		this.props.handleContextMenuOpen(contextMenuMessageId)
	}

	wrapperContextMenuEdit(textArea, messageId, editFlag, editedText) {
		if (editFlag) document.getElementById('myTextArea').focus();
		this.props.handleChatControlContent(this.props.chatWith, textArea, messageId, editFlag, editedText)
	}

	wrapperContextMenuReply(textArea) {
		document.getElementById('myTextArea').focus();
		this.props.handleChatControlContent(this.props.chatWith, `#{${textArea}}, `, null, false, '')
	}

	getPrivateTypingInfo(from) {
		var arr = this.props.privateTyping
		for (var i = 0; i < arr.length; i++) {
			if (arr[i].from === from) {
				return {private: true, from: arr[i].from, flag: arr[i].flag}
			}
		}
	}

	findElementById(array, id) {
		for (var i = 0; i < array.length; i++) {
			if (array[i].id === id) {
				return array[i]
			}
		}
		return {id, textArea: '', messageId: null, editFlag: false}
	}

	getMessageById(messages, time) {
		for (var i = 0; i < messages.length; i++) {
			if (messages[i].time === time) {
				return messages[i]
			}
		}
	}

	isMessagesEqual(messages1, messages2) {
		if (messages1.length !== messages2.length) return false;
		for (var i = 0; i < messages1.length; i++) {
			if (messages1[i].time !== messages2[i].time) {
				return false
			}
		}
		return true
	}

}

const
	mapStateToProps = (state) => {
		return {
			messages: state.messagesReducer,
			contextMenuMessageId: state.contextMenuOpenReducer,
			editingInfo: state.contextMenuEditReducer,
			isMarked: state.markEditedMessageReducer,
			chatControlContent: state.chatControlContentReducer,
			markedMessage: state.markedMessageReducer,
			publicTyping: state.publicTypingReducer,
			privateTyping: state.privateTypingReducer
		}
	}

const
	mapDispatchToProps = (dispatch) => {
		return {
			handleContextMenuOpen: bindActionCreators(contextMenuOpen, dispatch),
			handleContextMenuEdit: bindActionCreators(contextMenuEdit, dispatch),
			handleMarkEditedMessage: bindActionCreators(markEditedMessage, dispatch),
			handleChatControlContent: bindActionCreators(chatControlContent, dispatch),
			handleMarkedMessage: bindActionCreators(markMessage, dispatch)
		}
	}

export default connect(mapStateToProps, mapDispatchToProps)(MessagesList)