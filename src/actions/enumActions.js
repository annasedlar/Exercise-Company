import { api } from './axiosConfig';

function setEquipmentEnums(equipment){
	return {
		type: 'SET_EQUIPMENT_ENUMS',
		payload: equipment
	}
}

function setBodyTypeEnums(bodytypes){
	return {
		type: 'SET_BODYTYPE_ENUMS',
		payload: bodytypes
	}
}

function setLocationEnums(locations){
	return {
		type: 'SET_LOCATION_ENUMS',
		payload: locations
	}
}

function setFeedbackEnums(feedback){
	return {
		type: 'SET_FEEDBACK_ENUMS',
		payload: feedback
	}
}

function setFeedbackDescription(feedbackDescriptions){
	return {
		type: 'SET_FEEDBACK_DESCRIPTIONS',
		payload: feedbackDescriptions
	}
}

export function fetchEnums(){
	return dispatch => {
		api.fetch('getenumsresponse')
			.then(response => {
				if (!response.status.error) {
					dispatch(setEquipmentEnums(response.data.enums.equipment))
					dispatch(setBodyTypeEnums(response.data.enums.bodyTypes))
					dispatch(setLocationEnums(response.data.enums.locations))
					dispatch(setFeedbackEnums(response.data.enums.feedbackBodyTypes))
					dispatch(setFeedbackDescription(response.data.enums.feedbacks))
				} else {
					console.log("this didn't work", response);
				}
			})
			.catch(err => console.log(err))
	}
}
