import React, { Component } from 'react';
import { Row, Input, Button, Icon } from 'react-materialize';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

class ExerciseForm extends Component {

handleChange = event => {
	this.props.handleInput(event)
}

render(){
	if (!this.props.feedbacks) {
		return (
			<h1>Please log in</h1>
		)
	}
	const { exercise, feedbacks, equipment, bodyAreas } = this.props;
	let errors = exercise.errors.map((error, index) => <p className='errors' key={index}>{error}</p>)
	let feedbackValues = feedbacks.map(feedback => {
		return {label: feedback.message, value: feedback.feedback}
	})

	let equipmentOptions = equipment.map((item, index) => {
		return <option key={index} value={item.equipment}>{item.name}</option>
	})
	let bodyAreasOptions = bodyAreas.map((item, index) => {
		return <option key={index} value={item.bodyType}>{item.name}</option>
	})
	let repsToPoints = exercise.repsToPoints.map(String)
	return (
		<form id="create-exercise-form" onSubmit={this.props.handleSubmit}>
			{
				errors.length ? (
					<div data-test="error-div" className="errorDiv">
						{errors}
					</div>
				) : (
					null
				)
			}
			<Row>
				<Input name="name" required data-test="exercise-name-input" className="name-input" label="Exercise Name" s={6} value={exercise.name} onChange={this.handleChange}/>
				<Input s={6} type='select' name="bodyTypes" data-test="body-area-input" label="Body Area" value={exercise.bodyTypes[0] || ""} onChange={this.handleChange}>
					<option disabled value="">Please Choose One</option>
					{bodyAreasOptions}
				</Input>
			</Row>
			<Row>
				<Input s={6} type='select' name="focusAreas" data-test="focus-areas-input" label="Focus Areas" value={exercise.focusAreas} onChange={this.handleChange} multiple>
					<option disabled value="">Please choose as many as needed</option>
					{bodyAreasOptions}
				</Input>
				<Input s={6} type='select' name="equipment" data-test="equipment-input" label="Equipment" value={exercise.equipment} onChange={this.handleChange} multiple>
					<option value="wipe">No Equipment</option>
					{equipmentOptions}
				</Input>
			</Row>
			<Row>
				<h5>Score based of Reps</h5>
				<Input data-test="level1" name="level1" label="Level 1 reps" s={2} value={repsToPoints[0]} type="number" onChange={this.handleChange}/>
				<Input data-test="level2" name="level2" label="Level 2 reps" s={2} value={repsToPoints[1]} type="number" onChange={this.handleChange}/>
				<Input data-test="level3" name="level3" label="Level 3 reps" s={2} value={repsToPoints[2]} type="number" onChange={this.handleChange}/>
				<Input data-test="level4" name="level4" label="Level 4 reps" s={2} value={repsToPoints[3]} type="number" onChange={this.handleChange}/>
				<Input data-test="level5" name="level5" label="Level 5 reps" s={2} value={repsToPoints[4]} type="number" onChange={this.handleChange}/>
			</Row>
			<div className="section" data-test="dropdown-div">
				<h5 className="section-heading">Suggested Feedback</h5>
				<Select
					id="suggestedFeedbacks"
					closeOnSelect={true}
					value={exercise.suggestedFeedbacks}
					multi
					placeholder="Select Feedback"
					simpleValue
					options={feedbackValues}
					removeSelected={true}
					onChange={this.props.handleSelectChange}
					autosize={false}
				/>
			</div>
			{
				exercise.suggestedWeightMen ? (
					<div className="suggestedWeight">
						<Row>
							<h5>Mens Suggested Weight</h5>
							<Input data-test="level1Men" name="level1Men" label="Level 1 Mens Weights" s={2} defaultValue={exercise.suggestedWeightMen[0]} type="number" onChange={this.handleChange}/>
							<Input name="level2Men" label="Level 2 Mens Weights" s={2} defaultValue={exercise.suggestedWeightMen[1]} type="number" onChange={this.handleChange}/>
							<Input name="level3Men" label="Level 3 Mens Weights" s={2} defaultValue={exercise.suggestedWeightMen[2]} type="number" onChange={this.handleChange}/>
							<Input name="level4Men" label="Level 4 Mens Weights" s={2} defaultValue={exercise.suggestedWeightMen[3]} type="number" onChange={this.handleChange}/>
							<Input name="level5Men" label="Level 5 Mens Weights" s={2} defaultValue={exercise.suggestedWeightMen[4]} type="number" onChange={this.handleChange}/>
						</Row>
						<Row>
							<h5>Womens Suggested Weight</h5>
							<Input name="level1Women" className="active" label="Level 1 Womens Weights" s={2} defaultValue={exercise.suggestedWeightWomen[0]} type="number" onChange={this.handleChange}/>
							<Input name="level2Women" label="Level 2 Womens Weights" s={2} defaultValue={exercise.suggestedWeightWomen[1]} type="number" onChange={this.handleChange}/>
							<Input data-test="level3Women" name="level3Women" label="Level 3 Womens Weights" s={2} defaultValue={exercise.suggestedWeightWomen[2]} type="number" onChange={this.handleChange}/>
							<Input name="level4Women" label="Level 4 Womens Weights" s={2} defaultValue={exercise.suggestedWeightWomen[3]} type="number" onChange={this.handleChange}/>
							<Input name="level5Women" label="Level 5 Womens Weights" s={2} defaultValue={exercise.suggestedWeightWomen[4]} type="number" onChange={this.handleChange}/>
						</Row>
						<Row>
							<Button data-test="removeGenderWeight" onClick={() => { if (window.confirm('Are you sure you wish to remove weights?')) this.props.handleRemoveGenederWeight() } }waves='light'>Remove weight for genders</Button>
						</Row>
					</div>
				) : (
					<Button className="button" data-test="addGenderWeight" onClick={this.props.handleAddGenederWeight} waves='light'>Add weight for genders</Button>
				)
			}
			<Button className="button" data-test="exercise-submit-button" type="submit" value="submit" waves='light'>Submit<Icon left>save</Icon></Button>
		</form>
	)
}
}
export default ExerciseForm;
