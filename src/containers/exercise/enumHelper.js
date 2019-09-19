import React from 'react'

export function suggestedWeights(exercise) {
	let weights = {}

	if (exercise.suggestedWeightMen && exercise.suggestedWeightWomen) {
		let menWeight = exercise.suggestedWeightMen.map((weight, i) => {
			return (
				<p key={i}>Level {i + 1} for men is {weight} pounds</p>
			)
		})
		let womenWeight = exercise.suggestedWeightWomen.map((weight, i) => {
			return (
				<p key={i}>Level {i + 1} for women is {weight} pounds</p>
			)

		})
		weights.mensWeights = menWeight;
		weights.womensWeights = womenWeight;
	} else {
		weights = null;
	}
	return weights
}
export function neededEquipment(exercise, equipmentEnums){
	let equipment;
	if (exercise.equipment) {
		let enumEquipment = equipmentEnums.filter(equipment => exercise.equipment.includes(equipment.equipment))
		equipment = enumEquipment.map((item, i) => <p key={i}>{item.name}</p>)
	}
	return equipment
}

export function configurefocusAreas(exercise, bodyTypesEnums){
	let enumFocusAreas = bodyTypesEnums.filter(focusArea => exercise.focusAreas.includes(focusArea.bodyType))
	let focusAreas = enumFocusAreas.map((area, i) => <p key={i}>{area.name}</p>)
	return focusAreas
}

export function configureSuggestedFeed(exercise, feedbackDescriptions){
	let suggestedFeedbackEnums = feedbackDescriptions.filter(feedback => exercise.suggestedFeedbacks.includes(feedback.feedback));
	let suggestedFeedback = suggestedFeedbackEnums.map((feedback, i) => <p key={i}>{feedback.feedback}: {feedback.message}</p>)
	let output = {};
	output.feet = suggestedFeedback.filter(feedback => feedback.props.children[0].includes('A'))
	output.knees = suggestedFeedback.filter(feedback => feedback.props.children[0].includes('B'))
	output.hips = suggestedFeedback.filter(feedback => feedback.props.children[0].includes('C'))
	output.core = suggestedFeedback.filter(feedback => feedback.props.children[0].includes('D'))
	output.shoulders = suggestedFeedback.filter(feedback => feedback.props.children[0].includes('E'))
	output.elbows = suggestedFeedback.filter(feedback => feedback.props.children[0].includes('F'))
	output.hands = suggestedFeedback.filter(feedback => feedback.props.children[0].includes('G'))
	output.head = suggestedFeedback.filter(feedback => feedback.props.children[0].includes('H'))
	return output
}
