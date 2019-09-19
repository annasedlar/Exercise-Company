function allEqual(arr) {
	return new Set(arr).size <= 4;
}

const exerciseFormValidation = exercise => {
	exercise.repsToPoints = exercise.repsToPoints.map(String);
	let errorMessages = [];
	if (!exercise.bodyTypes.length) {
		errorMessages.push('Please pick a body area')
	}
	if (!exercise.focusAreas.length) {
		errorMessages.push('Please pick at least one focus area')
	}
	if (!exercise.suggestedFeedbacks.length) {
		errorMessages.push('Please pick at least one suggested feedback')
	}
	if (allEqual(exercise.repsToPoints) && JSON.stringify(exercise.repsToPoints) !== JSON.stringify(["0", "0", "0", "0", "1"])) {
		errorMessages.push('Please use unique numbers for score based of reps or 0, 0, 0, 0, 1 to represent pass fail')
	}
	if (exercise.suggestedWeightWomen) {
		exercise.suggestedWeightWomen = exercise.suggestedWeightWomen.map(String);
		exercise.suggestedWeightMen = exercise.suggestedWeightMen.map(String);
		if (allEqual(exercise.suggestedWeightWomen)) {
			errorMessages.push('Please use unique numbers for suggested weight for women')
		}
		if (allEqual(exercise.suggestedWeightMen)) {
			errorMessages.push('Please use unique numbers for suggested weight for men')
		}
	}
	return errorMessages
}

export default exerciseFormValidation;
