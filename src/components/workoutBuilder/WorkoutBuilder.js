import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './WorkoutBuilder.css';
import { newWorkout, createWorkout } from '../../actions/workoutActions'
import SubmitWorkout from '../submitWorkout/SubmitWorkout';
import { handleSearch, handleFilter } from '../filterForm/FilterHelper';
import { addBodyPartFilter, removeBodyPartFilter, resetBodyPartFilters, updateSearch, selectExercise, removeEquipmentFilter, addEquipmentFilter, resetEquipmentFilters } from '../../actions/exerciseActions.js'

class WorkoutBuilder extends Component {

  initialFilter = () => {
  	let exercises;
  	if (this.props.admin.currentAdminAuthToken) {
  		const newWorkoutIds = this.props.newWorkoutValue.exerciseDescriptions.map(exercise => exercise.id)
  		exercises = this.props.exercises.filter(exercise => !newWorkoutIds.includes(exercise.id))
  	}
  	return exercises
  }

  getInitialState = () => {
    const initialState = {
      exercises: this.initialFilter(),
      workout: this.props.newWorkoutValue,
    }
    return initialState;
  }

  state = this.getInitialState()

  componentDidUpdate(prevProps) {
    if (this.props.newWorkoutValue !== prevProps.newWorkoutValue) {
      this.setState({ workout: this.props.newWorkoutValue })
    }

    if ((this.props.searchValue !== prevProps.searchValue) || (this.props.equipmentFilter !== prevProps.equipmentFilter) || (this.props.bodypartFilter !== prevProps.bodypartFilter)) {

      let initialFilteredExercises = this.initialFilter()
      let newExercises = handleSearch(handleFilter(initialFilteredExercises, this.props.bodypartFilter, this.props.equipmentFilter), this.props.searchValue)
      this.setState({ exercises: newExercises })
    }
  }

  render() {
    let { bodypartFilter, searchValue, equipmentFilter, admin, addBodyPartFilter, removeBodyPartFilter, resetBodyPartFilters, updateSearch, selectExercise, removeEquipmentFilter, addEquipmentFilter, resetEquipmentFilters } = this.props;
    let values = { searchValue, bodypartFilter, equipmentFilter }
    let equipmentFilterFunctions = { equipmentFilter, addEquipmentFilter, removeEquipmentFilter, resetEquipmentFilters }
    let bodyFilterFunctions = { bodypartFilter, addBodyPartFilter, removeBodyPartFilter, resetBodyPartFilters }
    if (!admin.currentAdminAuthToken) {
      return (
        <div className="workout-builder">
         <h1>Workout Builder</h1>
         <h1>Please log in</h1>
        </div>
      )
    } else {
      return (
        <div className="workout-builder">
         <h1>Workout Builder</h1>
         <SubmitWorkout state={this.state} selectExercise={selectExercise} workoutCall={this.props.newWorkout} apiCall={this.props.createWorkout} values={values} equipmentFilterFunctions={equipmentFilterFunctions} bodyFilterFunctions={bodyFilterFunctions} updateSearch={updateSearch}/>
        </div>
     );
    }
 }
}

function mapStateToProps(state){
	const { exercises, bodypartFilter, searchValue, equipmentFilter} = state.exercise;

	return {
		exercises,
		bodypartFilter,
		searchValue,
		equipmentFilter,
		newWorkoutValue: state.workout.newWorkoutValue,
		admin: state.admin.currentAdmin

	}
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    addBodyPartFilter,
    removeBodyPartFilter,
    resetBodyPartFilters,
    updateSearch,
    resetEquipmentFilters,
    addEquipmentFilter,
    removeEquipmentFilter,
    selectExercise,
    newWorkout,
    createWorkout,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkoutBuilder);
