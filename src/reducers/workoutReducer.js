import update from 'immutability-helper';

const initialState = {
	workouts: null,
	currentWorkout: null,
	selectedWorkout: null,
	clickWorkout: {},
	newWorkoutValue: {
		exerciseDescriptions: [],
		name: ''
	},
}

const workoutReducer = function(state = initialState, action) {
	switch(action.type){
	case 'SET_WORKOUTS':
		return update(state, {
			workouts: {
				$set: action.payload
			}
		})
	case 'NEW_WORKOUT':
		return update(state, {
			newWorkoutValue: {
				$set: action.payload
			}
		})
	case 'RESET_NEW_WORKOUT':
		return update(state, {
			newWorkoutValue: {
				exerciseDescriptions: { $set: [] },
				name: { $set: '' }
			}
		})
	case 'CURRENT_WORKOUT':
		return update(state, {
			selectedWorkout: {
				$set: action.payload
			}
		})
	case 'CLICK_WORKOUT':
		return update(state, {
			clickWorkout: {
				$set: action.payload
			}
		})
	// case 'SET_WORKOUT_DATES':
	// 	return update(state, {
	// 		clickWorkout: {
	// 			daysInUTC : {
	// 				$push: action.payload
	// 			}
	// 		}
	// 	})
	case 'SET_NEW_WORKOUT_DATES':
		return update(state, {
			clickWorkout: {
				daysInUTC: {
					$set: action.payload
				}
			}
		})
	case 'REMOVE_DATES':
		return update(state, {
			clickWorkout:{
				dates: {
					$apply: function(dateArray){
						let newDateArray = dateArray.filter(filters => filters !== action.payload)
						return newDateArray
					}
				}
			}
		})
	default:
		return state;
	}
}

export default workoutReducer;
