import { api } from './axiosConfig';

export function selectSession(session) {
	return {
		type: 'SELECT_SESSION',
		payload: session
	}
}

export function addDateFilter(sessionDateFilter){
	return {
		type: 'ADD_DATE_FILTER',
		payload: sessionDateFilter
	}
}

export function addLocationFilter(sessionLocationFilter){
	return {
		type: 'ADD_LOCATION_FILTER',
		payload: sessionLocationFilter
	}
}

export function removeLocationFilter(sessionLocationFilter){
	return {
		type: 'REMOVE_LOCATION_FILTER',
		payload: sessionLocationFilter
	}
}

export function searchByDay(searchedByDay){
	return {
		type: 'SEARCH_BY_DAY',
		payload: searchedByDay
	}
}

export function searchByWeek(searchedByWeek){
	return {
		type: 'SEARCH_BY_WEEK',
		payload: searchedByWeek
	}
}

export function updateSessionSearch(sessionSearchValue){
	return {
		type: 'SESSION_SEARCH',
		payload: sessionSearchValue
	}
}

export function setNoSessionReponse(errorMessage){
	return {
		type: 'NO_SESSIONS',
		payload: [errorMessage]
	}
}

export function getSessions(sessionParams){
	return dispatch => {
		let postData;

		if(sessionParams.week){
			postData = {
				"weekTime": sessionParams.date,
				"location": sessionParams.location,
				"responseMask": {
					"location": true,
					"startTime": true,
					"workoutId": true,
					"workoutName": true,
					"attendees": true
				}
			}
		} else {
			postData = {
				"dayTime": sessionParams.date,
				"location": sessionParams.location,
				"responseMask": {
					"startTime": true,
					"location": true,
					"attendees": true,
					"workoutName": true,
					"workoutId": true
				}
			}
		}
		api.getSessions('getSessions', postData)
			.then(response => {
				if (response.data.sessions) {
					let timeFormattedSessions = response.data.sessions.map(session => {
						let utc = new Date(session.startTime).getTime();
						let offset;
						// Test location/Mountain View are in PST, which is UTC minus 8 hours
						if(session.location === "TEST_LOCATION" || session.location === "MOUNTAIN_VIEW"){
							offset = -8;   							
						// New York is in EDT, which is UTC minus 4 hours
						} else if(session.location === "NEW_YORK"){
							offset = -4;
						}
						// session.startTime = new Date(utc + (3600000*offset)).toISOString();
						return {
							...session,
							startTime: new Date(utc + (3600000*offset)).toISOString()
						};
					});
					dispatch(updateSessionSearch(timeFormattedSessions));
				} else {
					if(response.data.sessions === null || response.data.sessions === undefined || !response.data.sessions){
						console.log('ERROR: ', response);
						console.log("No Sessions for specified parameters")
						dispatch(setNoSessionReponse('No Sessions for specified parameters'));
				}
			}
			})
			.catch(error => {
				console.log(error)
				dispatch(setNoSessionReponse('No Sessions for specified parameters'));
			})
	}
}

export function resetReturnedSessions(){
	return {
		type: 'RESET_RETURNED_SESSIONS'
	}
}