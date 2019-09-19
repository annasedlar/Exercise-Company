import update from 'immutability-helper';

const initialState = {
	currentAdmin: {
		currentAdminName: null,
		currentAdminEmail: null,
		currentAdminAuthToken: null,
	}
}

const adminReducer = function(state = initialState, action) {
	switch(action.type){
	case 'LOGIN_SUCCESS':
		return update(state, {
			currentAdmin: {
				$set: action.payload
			}
		})
	default:
		return state;
	}
}

export default adminReducer
