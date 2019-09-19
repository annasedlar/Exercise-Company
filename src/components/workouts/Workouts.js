import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { Card, Col, Row, Button, Icon, Modal } from 'react-materialize';
import { selectExercise } from '../../actions/exerciseActions.js';
import { currentWorkout, clickWorkout } from '../../actions/workoutActions.js';
import './Workouts.css';
import AssignWorkoutModal from './AssignWorkoutModal.js';

class Workouts extends Component {
  state = {
    displayAssignmentModal: false
  }

  assignmentModal = workout => {
    if(this.state.displayAssignmentModal){
      return (
        <AssignWorkoutModal workout={workout} name={workout.name}/>
      )
    }
	}

  assignToSessionButton = (e, workout) => {
  	e.preventDefault();
		this.setState({displayAssignmentModal: !this.state.displayAssignmentModal});
		this.props.clickWorkout(workout);
	}

	closeAssignLayout = () => {
		this.setState({displayAssignmentModal: !this.state.displayAssignmentModal})
	}

  makeEquipmentArray = workout => {
    let equipmentArray = []
    workout.exerciseDescriptions.forEach(exercise => {
      if (exercise.equipment) {
        exercise.equipment.forEach(equipment => {
          equipmentArray.push(equipment)
        })
      }
    })
    let uniqueEquipmentSet = new Set(equipmentArray);
    return [...uniqueEquipmentSet]
  }

  render() {
  	let workoutCards;

  	if (this.props.workouts) {
  		workoutCards = this.props.workouts.map((workout, i) => {
  			return(
  				<Modal
						header={workout.name}
						modalOptions={{ complete: () => {this.closeAssignLayout()} }}
  					key={workout.id}
  					data-test="workout-card"
  					trigger={
  						<Card className="#e1f5fe light-blue lighten-5"
  							textClassName="white-text"
  							title={workout.name}>
	 						</Card>}>
  					<Link to="/workout/edit" >
  						<Button
  							onClick={ () => this.props.currentWorkout(workout) }
  							waves="light"
  							modal="close"
  							data-test="edit-workout">
  							<Icon right>edit</Icon>Edit Workout
  						</Button>
            </Link>
						<Button className="assign-button"
							onClick={ (e) => {this.assignToSessionButton(e, workout)}}
							waves="light"
              data-test="assign-dates">
                    Assign To Date
							<Icon right>assignment</Icon>
						</Button>
            {this.assignmentModal(workout)}
            <div>
              <h5>Equipment Needed</h5>
              {this.makeEquipmentArray(workout).map((item, i) => <span key={i}> {item}, </span>)}
            </div>
  					<ol>
  						{workout.exerciseDescriptions.map((exercise, index) => {
  							return(
  								<div key={index} onClick={ () => this.props.selectExercise(exercise)}>
  									<Link to={{ pathname: `/exercises/${exercise.id}` }}>
  										<li>{exercise.name}</li>
  									</Link>
  								</div>
  							)
  						})}
  					</ol>
  				</Modal>
  			)
  		})
  	}

  	return (
  		<div className="workouts">
  			<Row>
  				<Col s={12}>
  					<h1>Workouts</h1>
  				</Col>
  			</Row>
  			<Row>
  				{workoutCards ? (
  					<Col s={6} m={12}>
  						{ workoutCards }
  					</Col>
  				) : (
  					<h4 data-test="need-to-login">Please log in</h4>
  				)}
  			</Row>
  		</div>
  	);
  }
}

function mapStateToProps(state){
	return {
		workouts: state.workout.workouts
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({
		selectExercise,
		currentWorkout,
		clickWorkout
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Workouts);
