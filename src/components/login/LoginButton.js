import React, { Component } from 'react';
import { GoogleLogin } from 'react-google-login';

const testResponse = {
	accessToken: "thisIsTheAccessToken",
	w3: {
		ig: "Robby Dore",
		U3: "robbydore@email.com"
	}
};

export default class LoginButton extends Component {
	render() {
		if (this.isTesting()) {
			return this.testButton();
		} else {
			return this.realButton();
		}
	}

  isTesting = () => {
  	const testQueryStringParam = /test=1/.test(window.location.search);
  	const testProp = this.props.test;

  	return testQueryStringParam || testProp;
  }

  testButton = () => (
  	<button onClick={(this.testSuccess)}>
      Login
  	</button>
  );

  realButton = () => (
  	<GoogleLogin
  		clientId="286067581241-a4017j9bk4sme6l4gec8gfdtl7h85q80.apps.googleusercontent.com"
  		buttonText="Login"
  		onSuccess={this.props.onSuccess}
  		onFailure={this.props.onFailure}
  	/>
  );

  testSuccess = () => {
  	this.props.onSuccess(testResponse);
  }
}
