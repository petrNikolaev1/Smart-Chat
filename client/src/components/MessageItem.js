import React, {Component} from 'react'

import ContextMenu from '@/components/ContextMenu'

/*
Component representing a Message.
 */

export default class MessageItem extends Component {

	convertTime(date) {
		var d = new Date(date)
		return `${this.pad(d.getHours())}:${this.pad(d.getMinutes())} ${this.pad(d.getDate())}/${this.pad(d.getMonth() + 1)}`
	}

	pad(val) {
		return (val < 10) ? '0' + val : val;
	}

	handleContextMenu(event) {
		event.preventDefault();
		const clickX = event.clientX;
		const clickY = event.clientY;
		const screenW = window.innerWidth;
		const screenH = window.innerHeight;
		const rootW = this.root.offsetWidth;
		const rootH = this.root.offsetHeight;
		const right = (screenW - clickX) > rootW;
		const left = !right;
		const top = (screenH - clickY) > rootH;
		const bottom = !top;
		if (right) {
			this.root.style.left = `${clickX + 5}px`;
		}
		if (left) {
			this.root.style.left = `${clickX - rootW - 5}px`;
		}
		if (top) {
			this.root.style.top = `${clickY + 5}px`;
		}
		if (bottom) {
			this.root.style.top = `${clickY - rootH - 5}px`;
		}
		this.props.handleContextMenuOpen(this.props.time)
	}

	componentDidMount() {
		document.addEventListener('click', this.handleClick);
		document.addEventListener('scroll', this.handleScroll);
		document.addEventListener('contextmenu', this.handleContextMenuOutOfBound);
	}

	componentWillUnmount() {
		document.removeEventListener('click', this.handleClick);
		document.removeEventListener('scroll', this.handleScroll);
		document.removeEventListener('contextmenu', this.handleContextMenuOutOfBound);
	}

	handleClick = (event) => {

		const {isContextMenuVisible} = this.props;

		const wasOutside = !(event.target.contains === this.root);

		if (wasOutside && isContextMenuVisible) this.props.handleContextMenuOpen(null)
	}

	handleContextMenuOutOfBound = (event) => {
		const {isContextMenuVisible} = this.props;

		const wasOutside = !(this.rot === event.target);

		if (wasOutside && isContextMenuVisible) {
			this.props.handleContextMenuOpen(null)
		}

	}


	handleScroll = () => {
		const {isContextMenuVisible} = this.props
		if (isContextMenuVisible) this.props.handleContextMenuOpen(null)
	};

	render() {
		const {
			username, time, author, text, color, isContextMenuVisible,
			handleContextMenuEdit, edited, editable, handleContextMenuReply
		} = this.props
		return (
			<li id={time} class="clearfix">
				<div class="message-data align-right">
					<span class="message-data-edited">{edited ? 'edited' : null}</span>
					<span class="message-data-time">{this.convertTime(time)}</span> &nbsp; &nbsp;
					<span class="message-data-name">{author}</span> <i class="fa fa-circle me"></i>
				</div>
				<div ref={ref2 => {
					this.rot = ref2
				}}
					 onContextMenu={this.handleContextMenu.bind(this)}
					// onContextMenu={username === author ? this.handleContextMenu.bind(this) : null}
					 style={{background: color}} class="message other-message float-right">
					{text}
				</div>
				<div className="contextMenu" ref={ref => {
					this.root = ref
				}}>
					{(isContextMenuVisible) ?
						<ContextMenu handleContextMenuEdit={handleContextMenuEdit}
									 handleContextMenuReply={handleContextMenuReply}
									 isEditVisible={username === author}
									 isReplyVisible={username && username !== author}
									 editable={editable} text={text}/> : null}
				</div>
			</li>
		)
	}
}