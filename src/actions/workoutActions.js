import { api } from './axiosConfig';

function setWorkouts(workouts) {
	return {
		type: 'SET_WORKOUTS',
		payload: workouts
	}
}

export function newWorkout(workout){
	return {
		type: 'NEW_WORKOUT',
		payload: workout
	}
}

export function currentWorkout(workout){
	return {
		type: 'CURRENT_WORKOUT',
		payload: workout
	}
}

function resetNewWorkout(){
	return {
		type: 'RESET_NEW_WORKOUT'
	}
}

export function clickWorkout(workout){
	return {
		type: 'CLICK_WORKOUT',
		payload: workout
	}
}

export function setWorkoutDates(dates){
	return {
		type: 'SET_WORKOUT_DATES',
		payload: dates
	}
}

export function removeWorkoutDates(dates){
	return {
		type: 'REMOVE_DATES',
		payload: dates
	}
}

export function setNewWorkoutDates(dates){
	return {
		type: 'SET_NEW_WORKOUT_DATES',
		payload: dates
	}
}

export function setSortDates(dates, workout){
	let postData = {
		"dayStartInUTC": dates,
		"workoutId": workout.id,
		"workoutMask": {
		 "daysInUTC": true,
		 "exerciseDescriptions": true,
		 "name": true,
		 "exerciseIds": true
		}
	 }
	 return dispatch => {
		api.getSessions('setWorkoutDate', postData)
			.then(response => {
				console.log(response.data)
				if (response.data.workout.daysInUTC && !response.data.status.error) {
					dispatch(clickWorkout(response.data.workout))
				} else {
					console.log('ERROR: ', response);
					dispatch(setNewWorkoutDates('No Assignments Yet'));
				}
			})
			.catch(error => {
				console.log(error)
				dispatch(setNewWorkoutDates('No Assignments Yet'));
			})
	}
}

export function fetchWorkouts(){
	return dispatch => {
		api.fetch('workoutcollection')
			.then(response => dispatch(setWorkouts(response.data.items)))
			.catch(error => console.log(error))
	}
}

export function createWorkout(workout){
	return dispatch => {
		return api.createUpdateWorkout('addWorkout', {workout: workout})
			.then(response => {
				if (!response.data.status.error) {
					dispatch(resetNewWorkout())
					dispatch(fetchWorkouts())
					return response
				} else {
					console.log("this didn't work", response);
					return response
				}
			})
			.catch(error => console.log(error))
	}
}

export function updateWorkout(workout){
  return dispatch => {
    return api.createUpdateWorkout('modifyWorkout', {workout: workout})
    .then(response => {
      if (!response.data.status.error) {
        dispatch(fetchWorkouts())
        dispatch(currentWorkout(workout))
        return response
      } else {
        console.log("this didn't work", response);
        return response
      }
    })
      .catch(error => console.log(error))
    }
}
