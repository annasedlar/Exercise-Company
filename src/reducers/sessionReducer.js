import update from 'immutability-helper';

const initialState = {
	returnedSessions: [],
	searchedLocations: [],
	searchedDate: '',
	searchedDay: true,
	searchedWeek: false,
	selectedSession: null
}

const sessionReducer = function(state = initialState, action) {
	switch(action.type){
	case 'SELECT_SESSION':
		return update(state, {
			selectedSession: {
				$set: action.payload
			}
		})
	case 'ADD_DATE_FILTER':
		return update(state, {
			searchedDate: {
				$set: action.payload
			}
		})
	case 'ADD_LOCATION_FILTER':
		return update(state, {
			searchedLocations: {
				$push: [
					action.payload
				]
			}
		})
	case 'REMOVE_LOCATION_FILTER':
		return update(state, {
			searchedLocations: {
				$apply: function(locationArray) {
					let newFilterArray = locationArray.filter(location => location !== action.payload)
					return newFilterArray
				}
			}
		})
	case 'SEARCH_BY_DAY':
		return update(state, {
			searchedDay: {
				$set: action.payload
			}
		})
	case 'SEARCH_BY_WEEK':
		return update(state, {
			searchedWeek: {
				$set: action.payload
			}
		})
	case 'SESSION_SEARCH':
		return update(state, {
			returnedSessions: {
				$push: action.payload
			}
		})
	case 'RESET_RETURNED_SESSIONS':
		return update(state, {
			returnedSessions: {
				$set: []
			}
		})  
	case 'NO_SESSIONS':
		return update(state,{
			returnedSessions: {
				$set: action.payload
			}
		})
	default:
		return state;
	}
}

export default sessionReducer;