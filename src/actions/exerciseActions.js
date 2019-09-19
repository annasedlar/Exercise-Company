import { api } from './axiosConfig';
// Functions that are not exported
function setExercises(exercises){
	return {
		type: 'SET_EXERCISES',
		payload: exercises
	};
}

function addExercise(exercise){
	return {
		type: 'ADD_EXERCISE',
		payload: exercise
	}
}

function updateExerciseInRedux(exercise) {
	return {
		type: 'UPDATE_EXERCISE',
		payload: exercise
	}
}

// exported functions
export function selectExercise(exercise) {
	return {
		type: 'SELECT_EXERCISE',
		payload: exercise
	}
}

export function addBodyPartFilter(exerciseFilter){
	return {
		type: 'ADD_BODYPART_FILTER',
		payload: exerciseFilter
	}
}

export function resetBodyPartFilters(){
	return {
		type: 'RESET_BODYPART_FILTERS',
	}
}

export function removeBodyPartFilter(exerciseFilter){
	return {
		type: 'REMOVE_BODYPART_FILTER',
		payload: exerciseFilter
	}
}

export function addEquipmentFilter(exerciseFilter){
  return {
    type: 'ADD_EQUIPMENT_FILTER',
    payload: exerciseFilter
  }
}

export function resetEquipmentFilters(){
  return {
    type: 'RESET_EQUIPMENT_FILTERS',
  }
}

export function removeEquipmentFilter(exerciseFilter){
  return {
    type: 'REMOVE_EQUIPMENT_FILTER',
    payload: exerciseFilter
  }
}

export function updateSearch(searchValue){
	return {
		type: 'SEARCH',
		payload: searchValue
	}
}

export function fetchExercises(authToken){
	return dispatch => {
		api.fetch('listExercises')
			.then(response => dispatch(setExercises(response.data.exercises)))
			.catch(error => console.log(error))
	}
}

export function createExercise(exerciseParams){
	return dispatch => {
		return api.createExercise('addExercise', { exercise: exerciseParams})
			.then(response => {
				if (!response.data.status.error) {
					exerciseParams.id = response.data.exerciseId
					dispatch(addExercise(exerciseParams))
					return response
				} else {
					// TODO: Add error catching here
					console.log("This didn't work", response);
				}
			})
			.catch(error => console.log(error))
	}
}

export function updateExercise(exerciseParams){
	return dispatch => {
		return api.updateExercise('modifyExercise', {exercise: exerciseParams})
			.then(response => {
				if (!response.data.status.error) {
					dispatch(updateExerciseInRedux(exerciseParams))
					dispatch(selectExercise(exerciseParams))
					return response
				} else {
					console.log("this didn't work", response);
				}
			})
			.catch(err => console.log(err))
	}

}
