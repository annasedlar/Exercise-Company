import React, { Component } from 'react';
import './Sidebar.css';
import { Link } from 'react-router-dom';

class SideBarContainer extends Component {
	render() {
		return (
			<div className="sidebar">
				<ul className="navbar-nav">
					<li className="nav-item nav-link"><Link data-test="home" to="/"> Home </Link></li>
					<li className="nav-item nav-link"><Link data-test="login" to="/login"> Login </Link></li>
					<li className="nav-item nav-link"><Link data-test="exercises" to="/exercises"> Exercises </Link></li>
					<li className="nav-item nav-link"><Link data-test="sessions" to="/sessions"> Sessions </Link></li>
					<li className="nav-item nav-link"><Link data-test="workouts" to="/workouts"> Workouts </Link></li>
					<li className="nav-item nav-link"><Link data-test="workoutbuilder" to="/workoutbuilder"> Workout Builder </Link></li>
				</ul>
			</div>
		);
	}
}

export default SideBarContainer;