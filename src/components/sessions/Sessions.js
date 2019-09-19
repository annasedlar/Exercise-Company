import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addDateFilter, addLocationFilter, removeLocationFilter, searchByDay, searchByWeek, getSessions, resetReturnedSessions } from '../../actions/sessionActions.js'
import './Sessions.css';
import { Col, Row, Button, Icon, Input } from 'react-materialize';
import SessionCards from './SessionCards';
class Sessions extends Component {
  state = {
  	TEST_LOCATION: false,
  	NEW_YORK: false,
  	MOUNTAIN_VIEW: false,
  	submitClicked: false,
  	dateSelected: false,
  	formattedDate: '',
  	ISOTime: ''
  };

  postLocations = [
  	{name: "TEST_LOCATION", status: this.state.TEST_LOCATION},
  	{name: "NEW_YORK", status: this.state.NEW_YORK},
  	{name: "MOUNTAIN_VIEW", status: this.state.MOUNTAIN_VIEW}
  ];

  handleDateChange = e => {
  	// Correct Date Format: YYYY-MM-DDThh:mm:ssTZD (TZD is time zone designator where 00:00 is UTC time)
  	// Ex: 2018-06-06T08:30:00+00:00,
  	let isoDate = new Date(e.target.value).toISOString();
  	this.setState({formattedDate: (isoDate.split("T")[0] + "T00:00:00+00:00"),
  		dateSelected: true
  	});
  	this.props.addDateFilter(this.state.formattedDate);
  }

  getSunday = date => {
  	date = date.slice(0,10);
  	let dd = date.substr(8,2);
  	let mm = date.substr(5,2) - 1; // months are zero-indexed
  	let yyyy = date.substr(0,4);
  	let UNIXDate = new Date(yyyy, mm, dd);
  	let day = UNIXDate.getDay()
  	let diff = UNIXDate.getDate() - day;
  	let sundayForWeekSearch = new Date(UNIXDate.setDate(diff));
  	return sundayForWeekSearch
  }

  toggleChecked = e => {
  	const checked = e.target.checked;
  	const locationToUpdate = e.target.value;
  	this.setState({
  		[locationToUpdate]: checked
  	});
  	if (checked){
  		this.props.addLocationFilter(locationToUpdate);
  	}
  	if (!checked){
  		this.props.removeLocationFilter(locationToUpdate);
  	}
  }

  handlePostRequest = () => {
  	let requestDate = this.state.formattedDate;
  	this.props.week 
  		?
  		requestDate = this.getSunday(this.state.formattedDate).toISOString().split("T")[0] + "T00:00:00+00:00"
  		:
  		requestDate = this.state.formattedDate

  	if (this.state.TEST_LOCATION){
  		this.props.getSessions({date: requestDate, location: "TEST_LOCATION", week: this.props.week})
  	}
  	if (this.state.NEW_YORK){
  		this.props.getSessions({date: requestDate, location: "NEW_YORK", week: this.props.week})
  	}
  	if (this.state.MOUNTAIN_VIEW){
  		this.props.getSessions({date: requestDate, location: "MOUNTAIN_VIEW", week: this.props.week})
  	}
  }

  handleSubmit = () => {
  	this.setState({submitClicked:true});
  	this.props.resetReturnedSessions();
  	this.handlePostRequest();
  	this.renderSessionCards();
  }

  returnWeek = e => {
  	const checked = e.target.checked;
  	this.props.searchByWeek(checked);
  	this.props.searchByDay(!checked);
  }

  renderSessionCards = () => {
  	// If no location is selected
  	if( !this.state.TEST_LOCATION && !this.state.NEW_YORK && !this.state.MOUNTAIN_VIEW && this.state.submitClicked){
  		return (
  			<div>
  				<h4>Please select a location to search</h4>
  			</div>
  		)
  	}

  	// if date and location are selected and there ARE sessions for the search parameters
  	else if (this.state.submitClicked && this.props.sessions.searchedDate && this.props.sessions.searchedLocations && this.props.sessions.returnedSessions) {
			// if the API returns no sessions
			if(this.props.sessions.returnedSessions[0] === "No Sessions for specified parameters") {
				return (
					<div>
						<h4>There are no scheduled sessions for the selected date and location</h4>
					</div>
				)
			} else {
  			this.sessionsResCards = this.props.sessions.returnedSessions.map(session => {
					if(session.startTime){
						let ISOTime = session.startTime.slice(session.startTime.indexOf('T')+1)
						let TZ = " PST"
						if (ISOTime.includes(".000Z")) {
							ISOTime = ISOTime.replace(".000Z", "")
						}
						if (session.location === "NEW_YORK"){
							TZ = " EDT"
						}
						return (
							<SessionCards
								workoutName={session.workoutName}
								workoutId={session.workoutId}
								location={session.location}
								startTime={ISOTime + TZ}
								date={session.startTime.substr(0,10)}
								show={this.state.submitClicked.toString()}
								session={session}
								className="#e1f5fe light-blue lighten-5"
								textClassName="black-text"
								key={session.id}>
							</SessionCards>
						)
					} else {
						return (
							<h4>There are no scheduled sessions for the selected date and location</h4>
						)
					}
				});
				return this.sessionsResCards;
			}
  	}
  	// if date and location are selected but there are no sessions for the search parameters
  	else if (this.state.submitClicked && this.props.sessions.searchedDate && this.props.sessions.searchedLocations && !this.props.sessions.returnedSessions ){
  		return (
  			<div>
  				<h4>There are no scheduled sessions for the selected date and location</h4>
  			</div>
  		)
  	}
  	// if either one of date or location is not selected
  	else if ( (this.state.submitClicked && !this.props.sessions.searchedLocations) || (this.state.submitClicked && !this.props.sessions.searchedDate) ){
  		return(
  			<div>
  				<h4>No Sessions</h4>
  				<p>Please be sure both a date and location are selected to search</p>
  			</div>
  		)
  	}
  }

  render() {
  	return (
  		<div className="sessions">
  			<Row>
  				<Col s={12}>
  					<h1>Sessions</h1>
  				</Col>
  			</Row>
  			{this.props.loggedIn ?
  				(<div>
  					<Row>
  						<p> (While testing, before real sesssions have been added, a good test request is to search TEST_LOCATION on 6/6/2018) </p>
  					</Row>
  					<Row className='locations'>
  						<h6>Choose a Session Location: </h6>
  						<Input name='group1' type='checkbox' value='TEST_LOCATION' ref='test_location' label='TEST_LOCATION' data-test='test_location_checkbox' onChange={this.toggleChecked}/>
  						<Input name='group1' type='checkbox' value='MOUNTAIN_VIEW' label='MOUNTAIN_VIEW' ref='mountain_view' data-test='mountain_view_checkbox' onChange={this.toggleChecked}/>
  						<Input name='group1' type='checkbox' value='NEW_YORK' label='NEW_YORK' ref='new_york' data-test='new_york_checkbox' onChange={this.toggleChecked}/>
  					</Row>
  					<Row className='calendar'>
  						<Col sm={6}>
  							<h6>Choose a Session Date: </h6>
  							<p>(Time Zones are based on the Location selected)</p>
  							<Input name='on' type='date' placeholder='Select date' data-test='date-picker' onChange={this.handleDateChange} />
  						</Col>
  						<Col sm={3} offset='s2'>
  							<h6>Return Full Week?: </h6>
  							<Input name='week' type='checkbox' value='Yes' label='Yes' onChange={this.returnWeek}/>
  						</Col>
  					</Row>
  					<Row>
  						<Col sm={3}>
  							<Button waves='light' data-test='submit_button' onClick={this.handleSubmit}>Search<Icon right>cloud</Icon></Button>
  						</Col>
  					</Row>
  					<Row data-test='rendered_logic'>
  						{ this.renderSessionCards() }
  					</Row>
  				</div>
  				) : 
  				(
  					<h4 data-test="need-to-login">Please log in</h4>
  				)}
  		</div>
  	);
  }
}

function mapStateToProps(state){
	return {
		sessions: state.sessions,
		week: state.sessions.searchedWeek,
		loggedIn: state.admin.currentAdmin.currentAdminName
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({
		addDateFilter,
		addLocationFilter,
		removeLocationFilter,
		searchByDay,
		searchByWeek,
		getSessions,
		resetReturnedSessions
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Sessions);
