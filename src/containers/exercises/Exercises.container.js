import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addBodyPartFilter, removeBodyPartFilter, resetBodyPartFilters, updateSearch, selectExercise, removeEquipmentFilter, addEquipmentFilter, resetEquipmentFilters } from '../../actions/exerciseActions.js'
import { bindActionCreators } from 'redux';
import './Exercises.css';
import ExerciseCard from '../../components/exerciseCard/ExerciseCard';
import FilterForm from '../../components/filterForm/FilterForm';
import { handleSearch, handleFilter } from '../../components/filterForm/FilterHelper';

class Exercises extends Component {
// TODO: add a reset filters button

  handleEquipmentChange = event => {
    let { equipmentFilter, addEquipmentFilter, removeEquipmentFilter, resetEquipmentFilters } = this.props;
    if (equipmentFilter.includes(event.target.value)) {
      if (equipmentFilter.length > 1) {
        removeEquipmentFilter(event.target.value);
      } else {
        resetEquipmentFilters();
      }
    }
    else {
      addEquipmentFilter(event.target.value);
    }
  }

  handleBodyFilterChange = event => {
  	let { bodypartFilter, addBodyPartFilter, removeBodyPartFilter, resetBodyPartFilters } = this.props;
  	if (bodypartFilter.includes(event.target.value)) {
  		if (bodypartFilter.length > 1) {
  			removeBodyPartFilter(event.target.value);
  		} else {
  			resetBodyPartFilters();
  		}
  	}
  	else {
  		addBodyPartFilter(event.target.value);
  	}
  }

  handleChange = event => {
  	this.props.updateSearch(event.target.value);
  }

  render() {
  	let { bodypartFilter, exercises, searchValue, selectExercise, equipmentFilter, admin } = this.props;

  	if (exercises && admin.currentAdminAuthToken) {
  		let filteredExercises = handleSearch(handleFilter(exercises, bodypartFilter, equipmentFilter), searchValue)
  		var exerciseList = filteredExercises.map(exercise => {
  			return (
  				<ExerciseCard data={exercise} key={exercise.id} selectExercise={selectExercise} />
  			)
  		})
  		return (
  			<div className="exercises">
  				<h1 className="exercise-header" data-test="exercise-header">Exercises</h1>
  				<FilterForm handleChange={this.handleChange} handleBodyFilterChange={this.handleBodyFilterChange} handleEquipmentChange={this.handleEquipmentChange} bodypartFilter={bodypartFilter} searchValue={searchValue} equipmentFilter={equipmentFilter} />
  				<div className="exercise-list">
  					{exerciseList}
  				</div>
  			</div>
  		);
  	} else {
  		return (
  			<div className="exercises">
  				<h1 className="exercise-header" data-test="exercise-header">Exercises</h1>
  				<h4 data-test="need-to-login">Please log in</h4>
  			</div>
  		)
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
		admin: state.admin.currentAdmin,
	}
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    addBodyPartFilter,
    removeBodyPartFilter,
    resetBodyPartFilters,
    selectExercise,
    updateSearch,
    resetEquipmentFilters,
    addEquipmentFilter,
    removeEquipmentFilter,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Exercises);
