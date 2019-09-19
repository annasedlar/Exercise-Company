import update from 'immutability-helper';

const initialState = {
	equipmentEnums: null,
	bodytypeEnums: null,
	locationEnums: null,
	feedbackEnums: null,
	feedbackDescriptions: null,
}

const enumReducer = function(state = initialState, action) {
	switch(action.type){
	case 'SET_EQUIPMENT_ENUMS':
		return update(state, {
			equipmentEnums: {
				$set: action.payload
			}
		})
	case 'SET_BODYTYPE_ENUMS':
		return update(state, {
			bodytypeEnums: {
				$set: action.payload
			}
		})
	case 'SET_LOCATION_ENUMS':
		return update(state, {
			locationEnums: {
				$set: action.payload
			}
		})
	case 'SET_FEEDBACK_ENUMS':
		return update(state, {
			feedbackEnums: {
				$set: action.payload
			}
		})
	case 'SET_FEEDBACK_DESCRIPTIONS':
		return update(state, {
			feedbackDescriptions: {
				$set: action.payload
			}
		})
	default:
		return state;
	}
}

export default enumReducer;
