import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../../actions/adminActions.js';
import { fetchExercises } from '../../actions/exerciseActions.js'
import { fetchWorkouts } from '../../actions/workoutActions.js'
import { fetchEnums } from '../../actions/enumActions.js'
import { bindActionCreators } from 'redux';
import LoginButton from '../../components/login/LoginButton';
import { api } from '../../actions/axiosConfig';
import './Login.css';
import { Col } from 'react-materialize';

class Login extends Component {

  successfulLogin = (response) => {
  	let { login, fetchExercises, fetchWorkouts, fetchEnums } = this.props;
  	let currentAdmin = {
  		currentAdminName: response.w3.ig,
  		currentAdminEmail: response.w3.U3,
  		currentAdminAuthToken: response.accessToken,
  	}
  	login(currentAdmin)
  	api.authorizeAPIProvider(currentAdmin.currentAdminAuthToken)
  	fetchExercises()
  	fetchWorkouts()
  	fetchEnums()
  }

  responseGoogle = (response) => {
  	console.log(response);
  }



  render() {
  	if (!this.props.admin.currentAdminAuthToken) {
  		return (
  			<div className="login">
  				<h1>Login Page</h1>
  				<LoginButton
  					onSuccess={this.successfulLogin}
  					onFailure={this.responseGoogle}
  				/>
  			</div>
  		);
  	} if (this.props.admin.currentAdminAuthToken && !this.props.exercises){
  		return (
  			<div className="loading-screen">
  				<h4 data-test="loading-everything" className="loading-header">Thanks for your patience while everything loads</h4>
  				<Col className="pre-loader" s={6}>
  					{/* <img id="loading-logo" src={logo} alt="loading..." /> */}
  				</Col>
  			</div>
  		)
  	} else {
  		return (
  			<div className="login">
  				<h4 data-test="admin-name">Hello {this.props.admin.currentAdminName}!</h4>
  			</div>
  		)
  	}
  }
}

function mapStateToProps(state){
	return {
		admin: state.admin.currentAdmin,
		exercises: state.exercise.exercises,
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({
		login,
		fetchExercises,
		fetchWorkouts,
		fetchEnums,
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
