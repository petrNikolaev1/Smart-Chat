import React, {Component} from 'react'

/*
Component representing custom Context Menu for different interactions with messages (reply, edit, copy e.g.)
 */

class ContextMenu extends Component {

	copyToClipboard = str => {
		const el = document.createElement('textarea');
		el.value = str;
		el.setAttribute('readonly', '');
		el.style.position = 'absolute';
		el.style.left = '-9999px';
		document.body.appendChild(el);
		const selected =
			document.getSelection().rangeCount > 0
				? document.getSelection().getRangeAt(0)
				: false;
		el.select();
		document.execCommand('copy');
		document.body.removeChild(el);
		if (selected) {
			document.getSelection().removeAllRanges();
			document.getSelection().addRange(selected);
		}
	};

	editOption = (isVisible, handleContextMenuEdit, editable) => {
		if (isVisible) {
			return (
				<div
					onClick={handleContextMenuEdit}
					className={editable ? 'contextMenu--option' : 'contextMenu--option contextMenu--option__disabled'}>
					Edit
				</div>
			)
		}
		return null
	}

	replyOption = (isVisible, handleContextMenuReply) => {
		if (isVisible) {
			return (
				<div
					onClick={handleContextMenuReply}
					className='contextMenu--option'>
					Reply
				</div>
			)
		}
	}

	render() {
		const {handleContextMenuEdit, editable, text, isEditVisible, isReplyVisible, handleContextMenuReply} = this.props
		return (
			<div>
				{this.editOption(isEditVisible, handleContextMenuEdit, editable)}
				{this.replyOption(isReplyVisible, handleContextMenuReply)}
				<div className="contextMenu--option" onClick={() => this.copyToClipboard(text)}>Copy</div>
			</div>
		)
	}
}

export default ContextMenu

