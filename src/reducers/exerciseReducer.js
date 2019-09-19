import update from 'immutability-helper';

const initialState = {
	exercises: null,
	bodypartFilter: [],
	selectedExercise: null,
	searchValue: '',
	equipmentFilter: [],
}

const exerciseReducer = function(state = initialState, action) {
	switch(action.type){
	case 'SET_EXERCISES':
		return update(state, {
			exercises: {
				$set: action.payload
			}
		})
	case 'SELECT_EXERCISE':
		return update(state, {
			selectedExercise: {
				$set: action.payload
			}
		})
	case 'ADD_EXERCISE':
		return update(state, {
			exercises: {
				$push: [
					action.payload
				]
			}
		})
	case 'ADD_BODYPART_FILTER':
		return update(state, {
			bodypartFilter: {
				$push: [
					action.payload
				]
			}
		})
	case 'REMOVE_BODYPART_FILTER':
		return update(state, {
			bodypartFilter: {
				$apply: function(filterArray) {
					let newFilterArray = filterArray.filter(filters => filters !== action.payload)
					return newFilterArray
				}
			}
		})
	case 'RESET_BODYPART_FILTERS':
		return update(state, {
			bodypartFilter: {
				$set: []
			}
		})
	case 'ADD_EQUIPMENT_FILTER':
		return update(state, {
			equipmentFilter: {
				$push: [
					action.payload
				]
			}
		})
	case 'REMOVE_EQUIPMENT_FILTER':
		return update(state, {
			equipmentFilter: {
				$apply: function(filterArray) {
					let newFilterArray = filterArray.filter(filters => filters !== action.payload)
					return newFilterArray
				}
			}
		})
	case 'RESET_EQUIPMENT_FILTERS':
		return update(state, {
			equipmentFilter: {
				$set: []
			}
		})
	case 'SEARCH':
		return update(state, {
			searchValue: {
				$set: action.payload
			}
		})
	case 'UPDATE_EXERCISE':
		const exerciseIndex = state.exercises.findIndex(exercise => exercise.id === action.payload.id)
		return update(state, {
			exercises: {
				[exerciseIndex]: {
					$set: action.payload
				}
			}
		})
	default:
		return state;
	}
}

export default exerciseReducer
