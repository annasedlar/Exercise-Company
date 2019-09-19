import React, { Component } from 'react';
import { connect } from 'react-redux';
import { currentWorkout, updateWorkout } from '../../actions/workoutActions';
import { bindActionCreators } from 'redux';
import SubmitWorkout from '../../components/submitWorkout/SubmitWorkout';
import { handleSearch, handleFilter } from '../../components/filterForm/FilterHelper';
import { addBodyPartFilter, removeBodyPartFilter, resetBodyPartFilters, updateSearch, selectExercise, removeEquipmentFilter, addEquipmentFilter, resetEquipmentFilters } from '../../actions/exerciseActions.js'


class EditWorkout extends Component {

  initialFilter = () => {
  	let exercises;
  	if (this.props.admin.currentAdminAuthToken) {
  		const newWorkoutIds = this.props.currentWorkoutValue.exerciseDescriptions.map(exercise => exercise.id)
  		exercises = this.props.exercises.filter(exercise => !newWorkoutIds.includes(exercise.id))
  	}
  	return exercises
  }

  state = {
  	workout: this.props.currentWorkoutValue,
  	exercises: this.initialFilter(),
  }

  componentDidUpdate(prevProps) {
    if (this.props.currentWorkoutValue !== prevProps.currentWorkoutValue) {
      this.setState({ workout: this.props.currentWorkoutValue })
    }

    if ((this.props.searchValue !== prevProps.searchValue) || (this.props.equipmentFilter !== prevProps.equipmentFilter) || (this.props.bodypartFilter !== prevProps.bodypartFilter)) {

      let initialFilteredExercises = this.initialFilter()
      let newExercises = handleSearch(handleFilter(initialFilteredExercises, this.props.bodypartFilter, this.props.equipmentFilter), this.props.searchValue)
      this.setState({ exercises: newExercises })
    }
  }

  render(){
    let { bodypartFilter, searchValue, equipmentFilter, admin, addBodyPartFilter, removeBodyPartFilter, resetBodyPartFilters, updateSearch, selectExercise, removeEquipmentFilter, addEquipmentFilter, resetEquipmentFilters } = this.props;
    let values = { searchValue, bodypartFilter, equipmentFilter }
    let equipmentFilterFunctions = { equipmentFilter, addEquipmentFilter, removeEquipmentFilter, resetEquipmentFilters }
    let bodyFilterFunctions = { bodypartFilter, addBodyPartFilter, removeBodyPartFilter, resetBodyPartFilters }
    if (!admin.currentAdminAuthToken) {
      return (
        <div className="workout-builder">
         <h1>Edit Workout</h1>
         <h1>Please log in</h1>
        </div>
      )
    } else {
      return (
        <div className="workout-builder">
         <h1>Edit Workout</h1>
         <SubmitWorkout state={this.state} selectExercise={selectExercise} workoutCall={this.props.currentWorkout} apiCall={this.props.updateWorkout} values={values} equipmentFilterFunctions={equipmentFilterFunctions} bodyFilterFunctions={bodyFilterFunctions} updateSearch={updateSearch}/>
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
		currentWorkoutValue: state.workout.selectedWorkout,
		admin: state.admin.currentAdmin,
	}
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    currentWorkout,
    updateWorkout,
    selectExercise,
    addBodyPartFilter,
    removeBodyPartFilter,
    resetBodyPartFilters,
    updateSearch,
    resetEquipmentFilters,
    addEquipmentFilter,
    removeEquipmentFilter,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(EditWorkout)
