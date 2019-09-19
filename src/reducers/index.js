import { combineReducers } from 'redux';

import AdminReducer from './adminReducer';
import WorkoutReducer from './workoutReducer';
import ExerciseReducer from './exerciseReducer';
import EnumReducer from './enumReducer';
import SessionReducer from './sessionReducer';

const rootReducer = combineReducers({
	admin: AdminReducer,
	workout: WorkoutReducer,
	exercise: ExerciseReducer,
	enums: EnumReducer,
	sessions: SessionReducer
});

export default rootReducer;
