import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Alert from 'react-s-alert';

import Home from './components/home/Home';
import Login from './containers/login/Login';
import Exercises from './containers/exercises/Exercises.container';
import Workouts from './components/workouts/Workouts';
import WorkoutBuilder from './components/workoutBuilder/WorkoutBuilder';
import Sessions from './components/sessions/Sessions';
import ExerciseView from './containers/exercise/ExerciseView'
import CreateExercise from './containers/exercise/CreateExercise'
import SideBarContainer from './components/sideNavBar/sideBar';
import UpdateExercise from './containers/exercise/UpdateExercise';
import EditWorkout from './containers/modifyWorkout/EditWorkout';


class App extends Component {

	render() {
		return (
			<div className="App">
				<SideBarContainer />
				<Switch>
					<Route exact path='/' component ={Home} />
					<Route path='/exercise/edit/:id' component={UpdateExercise} />
					<Route path='/workout/edit' component={EditWorkout} />
					<Route path="/exercise/create" component={CreateExercise} />
					<Route path="/exercises/:id" component={ExerciseView} />
					<Route path="/login" component={Login} />
					<Route path="/exercises" component={Exercises} />
					<Route path="/sessions" component={Sessions} />
					<Route path="/workouts" component={Workouts} />
					<Route path="/workoutbuilder" component={WorkoutBuilder} />
				</Switch>
				<Alert stack={{limit: 3}} />
			</div>
		);
	}
}

export default App;
