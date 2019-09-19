import axios from 'axios';
const baseAPI = axios.create();
baseAPI.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;

const api = {
	authorizeAPIProvider: (authToken) => {
		baseAPI.defaults.headers.common['Authorization'] = `Bearer ${authToken}`
	},
	fetch: (url) => {
		return baseAPI.get(url)
	},
	createExercise: (url, params) => {
		return baseAPI.post(url, params)
	},
	getSessions: (url, params) => {
		return baseAPI.post(url, params)
	},
	updateExercise: (url, params) => {
		return baseAPI.put(url, params)
	},
	createUpdateWorkout: (url, params) => {
		return baseAPI.put(url, params)
	},
	setWorkoutDate: (url, params) => {
		return baseAPI.post(url, params)
	}
}

export {
	api
}
