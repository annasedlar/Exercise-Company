import React from 'react';
import { connect } from 'react-redux';
import { selectSession } from '../../actions/sessionActions.js';
import { bindActionCreators } from 'redux';
import { Card, Modal } from 'react-materialize';
import './Sessions.css';

const SessionCards = props => {
	const cards = props.show ? (
		<Modal
			header={props.name}
			data-test="session-card"
			onClick={() => props.selectSession(props.session)}
			trigger={
				<Card className="#e1f5fe light-blue lighten-5"
					textClassName="black-text"
					title={ `${props.location}, ${props.date}, ${props.startTime}`}
					key={props.id}>
				</Card>}>
			<p>Session Id: {props.session.id}</p>
			<p>Date: {props.date}</p>
			<p>Start Time: {props.startTime}</p>
			<p>Location: {props.session.location}</p>
			<p>Workout Name: {props.workoutName}</p>
			<p>Workout Id: {props.workoutId}</p>
		</Modal>
	) : (null) ;
	return cards
}

function mapStateToProps(state){
	return { }
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({
		selectSession
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SessionCards);