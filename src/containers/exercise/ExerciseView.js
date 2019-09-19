import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Exercises.css'
import { suggestedWeights, neededEquipment, configurefocusAreas, configureSuggestedFeed } from './enumHelper';
import { Button } from 'react-materialize';
import { selectExercise } from '../../actions/exerciseActions.js';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';


class ExerciseView extends Component {

	render() {
		// TODO: move calling enums from here into the enumHelper, return one object
		let { exercise, equipmentEnums, bodyTypesEnums, feedbackDescriptions, selectExercise } = this.props
		let equipment = neededEquipment(exercise, equipmentEnums)
		let weights = suggestedWeights(exercise)
		let focusAreas = configurefocusAreas(exercise, bodyTypesEnums);
		let repsToPoints = exercise.repsToPoints.map((point, i) => <p key={i}>{point} reps for a score of {i + 1}</p>)
		let bodyType = bodyTypesEnums.filter(bodytype => exercise.bodyTypes.includes(bodytype.bodyType))
		let suggestedFeedback = configureSuggestedFeed(exercise, feedbackDescriptions)
		if (exercise) {
			return (
				<div className="exercises">
					<h1 data-test="exercise-header">{exercise.name}</h1>
					<div className="basic-info">
						<div className="main-bodytype">
							<h5>Main Body Part</h5>
							<p data-test="exercise-bodytype">{bodyType[0].name}</p>
						</div>
						<div data-test="exercise-focusAreas" className="focus-areas">
							<h5>Focus Areas</h5>
							{focusAreas}
						</div>
						{
							equipment ? (
								<div data-test="equipment-div" className="equipment">
									<h5>Equipment Needed</h5>
									{equipment}
								</div>
							) : (
								<h5 data-test="no-equipment-header">No Equipment Needed</h5>
							)
						}
					</div>
					<div className='points'>
						<div data-test="exercise-repsToPoints" className='repsToPoints'>
							<h5>Score Based Off Reps</h5>
							{repsToPoints}
						</div>
						{
							weights ? (
								<div className='weights'>
									<div data-test="exercise-menWeight" className='menWeight'>
										<h5>Men's Score Based Off Weight Selection</h5>
										{weights.mensWeights}
									</div>
									<div data-test="exercise-womenWeight" className='womenWeight'>
										<h5>Women's Score Based Off Weight Selection</h5>
										{weights.womensWeights}
									</div>
								</div>
							) : (
								<div className='weights'>
									<div data-test="exercise-menWeight" className='menWeight'>
										<h5>No weight suggestions</h5>
									</div>
									<div data-test="exercise-womenWeight" className='menWeight'>
										<h5>No weight suggestions</h5>
									</div>
								</div>
							)
						}
					</div>
					<div data-test="exercise-feedbacks" className="exercise-feedbacks">
						<h5>Suggested Feedback</h5>
						<h6 className="feedback-header">Feet</h6>
						{suggestedFeedback.feet}
						<h6 className="feedback-header">Knees</h6>
						{suggestedFeedback.knees}
						<h6 className="feedback-header">Hips</h6>
						{suggestedFeedback.hips}
						<h6 className="feedback-header">Core</h6>
						{suggestedFeedback.core}
						<h6 className="feedback-header">Shoulders</h6>
						{suggestedFeedback.shoulders}
						<h6 className="feedback-header">Elbows</h6>
						{suggestedFeedback.elbows}
						<h6 className="feedback-header">Hands</h6>
						{suggestedFeedback.hands}
						<h6 className="feedback-header">Head</h6>
						{suggestedFeedback.head}
					</div>
					<Link data-test="edit-exercise-button" to={`/exercise/edit/${exercise.id}`}>
						<Button onClick={() => selectExercise(exercise)}>
              Edit Exercise
						</Button>
					</Link>
				</div>
			)
		} else {
			return (
				<div className="exercises">
					<h4 data-test="need-to-login">Please log in</h4>
				</div>
			)
		}
	}
}

function mapStateToProps(state) {
	return {
		exercise: state.exercise.selectedExercise,
		equipmentEnums: state.enums.equipmentEnums,
		bodyTypesEnums: state.enums.bodytypeEnums,
		feedbackDescriptions: state.enums.feedbackDescriptions,
	};
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({
		selectExercise,
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ExerciseView);
