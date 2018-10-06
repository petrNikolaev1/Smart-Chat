import React, {Component} from 'react'
import classNames from 'classnames'

import ContextMenu from '@/components/ContextMenu'
import '@/assets/styles/MessageItem.scss'

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
        } = this.props;

        const messageClass = classNames('message', {'message-my': username === author}, {'message-other': username !== author});
        const messageDataClass = classNames('message-data', {'message-data-my': username === author}, {'message-data-other': username !== author});

        return (
            <li id={time} className="message-container">
                <div className={messageDataClass}>
                    <div className="message-data-edited">{edited ? 'edited' : null}</div>
                    <div className="message-data-time">{this.convertTime(time)}</div>
                    &nbsp; &nbsp;
                    <div className="message-data-name">{author}</div>
                </div>
                <div ref={ref2 => {
                    this.rot = ref2
                }}
                     onContextMenu={this.handleContextMenu.bind(this)}
                     style={{background: color, borderBottomColor: color}} className={messageClass}>
                    {text}
                </div>
                <div className="context-menu" ref={ref => {
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
