import React, {Component} from 'react'
import {connect} from 'react-redux'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import UserItem from '@/components/UserItem'
import constants from '@/constants'
import '@/assets/styles/PeopleList.scss'

/*
Container that is responsible for interactions with the
list of chat users and its correct representation.
 */

class PeopleList extends Component {

	componentWillReceiveProps(nextProps) {
		if (nextProps.people !== this.props.people && !this.isChatWithAvailable(nextProps.people, nextProps.chatWith)){
			this.props.handleChatWith(constants.MAIN_PUBLIC_CHAT)
		}
	}

		render() {
		return (
			<div className="people-list" id="people-list">
				<ul className="list">
					<ReactCSSTransitionGroup
						transitionName="fade"
						transitionEnterTimeout={300}
						transitionLeaveTimeout={300}
						transitionAppear={true}
						transitionAppearTimeout={1000}>
					{this.props.people.map((user) => {
						return (
							<UserItem handleChatWith={this.props.handleChatWith} id={user.userID}
									  key={user.userID} username={user.username}/>
						)
					})}
					</ReactCSSTransitionGroup>
				</ul>
			</div>
		)
	}

	isChatWithAvailable(people, chatWith){
		for (var i=0; i<people.length; i++){
			if (people.username === chatWith)
				return true
		}
		return false
	}
}

const mapStateToProps = (state) => {
	return {
		people: state.peopleReducer
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		dispatch
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(PeopleList)