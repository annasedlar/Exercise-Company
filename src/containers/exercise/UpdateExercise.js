import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateExercise } from '../../actions/exerciseActions';
import ExerciseForm from '../../components/exerciseForm/ExerciseForm';
import update from 'immutability-helper';
import exerciseFormValidation from '../../components/exerciseForm/ValidationHelper';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/jelly.css';

class UpdateExercise extends Component {


  state = {...this.props.exercise, errors: []}

  handleSelectChange = value => {
  	this.setState({ suggestedFeedbacks: value });
  }

  handleChange = event => {
  	let attributeName = event.target.name;

  	if (attributeName === 'bodyTypes') {
  		this.setState({
  			bodyTypes: [event.target.value]
  		})
  	} else if (attributeName === 'focusAreas') {
  		let values = [...event.target.options].filter(o => o.selected).map(o => o.value);
  		this.setState({ focusAreas: values })
  	} else if (attributeName === 'equipment') {
  		if (event.target.value === "wipe") {
  			this.setState({ equipment: [] })
  		} else {
  			let values = [...event.target.options].filter(o => o.selected).map(o => o.value);
  			this.setState({ equipment: values })
  		}
  	} else if (attributeName.search("level") !== -1) {
  		if (attributeName.search("Men") !== -1) {
  			// If attributeName gets here, it will always have level then a number, so this one could be the attributeName is level3Men. This is why the index is hardcoded because all of the names from the form match up with this logic. Changing the names on the form could break this function's logic
  			let index = attributeName[5] - 1
  			this.setState({
  				suggestedWeightMen: update(this.state.suggestedWeightMen, {
  					[index]: { $set: event.target.value }
  				})
  			})
  		} else if (attributeName.search("Women") !== -1) {
  			let index = attributeName[5] - 1
  			this.setState({
  				suggestedWeightWomen: update(this.state.suggestedWeightWomen, {
  					[index]: { $set: event.target.value }
  				})
  			})
  		} else {
  			let index = attributeName[5] - 1
  			this.setState({
  				repsToPoints: update(this.state.repsToPoints, {
  					[index]: { $set: event.target.value }
  				})
  			})
  		}
  	}
  	else {
  		this.setState({ [attributeName]: event.target.value })
  	}
  }

  handleSubmit = event => {
  	let {errors, ...newExercise} = this.state;
  	if (!newExercise.suggestedWeightWomen) {
  		delete newExercise.suggestedWeightWomen
  		delete newExercise.suggestedWeightMen
  	}
  	errors = exerciseFormValidation(newExercise)
  	if (!errors.length) {
      newExercise.suggestedFeedbacks = newExercise.suggestedFeedbacks.toString();
      newExercise.suggestedFeedbacks = newExercise.suggestedFeedbacks.split(',')
  		this.props.updateExercise(newExercise).then(res => {
        if (res.data.status.error) {
          Alert.error(res.data.status.errorMessage, {
            effect: 'jelly',
            timeout: 'none',
            beep: false,
          })
        } else {
          Alert.success('Exercise updated!', {
            effect: 'jelly',
            timeout: 3000,
            beep: false
          })
        }
      })
  	} else {
  		this.setState({ errors: errors })
  	}
  	event.preventDefault();
  }

  handleAddGenederWeight = event => {
  	this.setState({ suggestedWeightMen: [1, 1, 1, 1, 1], suggestedWeightWomen: [1, 1, 1, 1, 1] })
  }

  handleRemoveGenederWeight = event => {
  	this.setState({ suggestedWeightMen: false, suggestedWeightWomen: false })

  }

  render() {
  	let { exercise, feedbacks, equipment, bodyAreas } = this.props
  	if (exercise) {
  		return (
  			<div className="exercises">
  				<h1 className="exercise-header">Update {exercise.name}</h1>
  				<ExerciseForm exercise={this.state} handleInput={this.handleChange} handleRemoveGenederWeight={this.handleRemoveGenederWeight} handleAddGenederWeight={this.handleAddGenederWeight} handleSubmit={this.handleSubmit} feedbacks={feedbacks} equipment={equipment} handleSelectChange={this.handleSelectChange} bodyAreas={bodyAreas} />
  			</div>
  		)
  	} else {
  		return (
  			<h4 data-test="need-to-login">Please login and go through the exercises list</h4>
  		)
  	}
  }
}

function mapStateToProps(state) {
	return {
		exercise: state.exercise.selectedExercise,
		feedbacks: state.enums.feedbackDescriptions,
		equipment: state.enums.equipmentEnums,
    bodyAreas: state.enums.bodytypeEnums,
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		updateExercise,
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateExercise);
