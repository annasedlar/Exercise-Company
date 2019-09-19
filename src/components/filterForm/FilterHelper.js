export const handleSearch = (exercises, searchValue) => {
	return exercises.filter(exercise => exercise.name.toLowerCase().search(searchValue.toLowerCase()) !== -1)
}

const handleEquipmentFiltering = (exercise, equipmentFilter) => {
	let included;
	if (equipmentFilter.includes('N/A') && !exercise.equipment ) {
		return true
	}
	if (exercise.equipment) {
		if (equipmentFilter.length === 1 && equipmentFilter.includes(exercise.equipment[0])) {
			included = true;
		}
		if (equipmentFilter.length === 2 && equipmentFilter[0] === exercise.equipment[0] && equipmentFilter[1] === exercise.equipment[1]  ) {
				included = true;
		}
		return included;
	} else {
		return false
	}
}

export const handleFilter = (exercises, bodypartFilter, equipmentFilter) => {
	if (bodypartFilter.length > 0 && equipmentFilter.length === 0) {
		return exercises.filter(exercise => bodypartFilter.includes(exercise.bodyTypes[0]))
	} else if (bodypartFilter.length === 0 && equipmentFilter.length > 0) {
		return exercises.filter(exercise => handleEquipmentFiltering(exercise, equipmentFilter))
	} else if (bodypartFilter.length > 0 && equipmentFilter.length > 0) {
		return exercises.filter(exercise => bodypartFilter.includes(exercise.bodyTypes[0]) && handleEquipmentFiltering(exercise, equipmentFilter))
	} else {
		return exercises;
	}
}
