import React, { Component } from 'react';
import WorkoutForm from '../workoutForm/WorkoutForm';
import ExerciseCard from '../exerciseCard/ExerciseCard';
import update from 'immutability-helper';
import { move, reorder } from '../workoutForm/WorkoutFormHelper';
import FilterForm from '../filterForm/FilterForm';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/jelly.css';

class SubmitWorkout extends Component {

  getInitialState = () => {
    return this.props.state
  }

  state = {...this.getInitialState(), error: ''}

  componentDidUpdate(prevProps){
    if (this.props.state.exercises !== prevProps.state.exercises) {
      this.setState({ exercises: this.props.state.exercises })
    }
  }

  getList = id =>{
      if (id === "exercises") {
        return this.state.exercises
      } else {
        return this.state.workout.exerciseDescriptions
      }
    }

  onDragEnd = result => {
    const { source, destination } = result;

    if (!destination) {
      return
    }

    if (source.droppableId === destination.droppableId) {
      const newState = reorder(
          this.getList(source.droppableId),
          source.index,
          destination.index
      );
      if (destination.droppableId === 'workoutExercises') {
        this.setState({ workout: update(this.state.workout, {
            exerciseDescriptions: { $set: newState }
          })
        })
      } else {
        this.setState({ [source.droppableId]: newState })
      }
    } else {
      const newState = move(
        this.getList(source.droppableId),
        this.getList(destination.droppableId),
        source,
        destination
      )

      this.setState({
        exercises: newState.exercises,
        workout: update(this.state.workout, {
          exerciseDescriptions: { $set:  newState.workoutExercises }
        })
      })
      this.props.workoutCall(this.state.workout)
    }
  }

  handleEquipmentChange = event => {
    let { equipmentFilter, addEquipmentFilter, removeEquipmentFilter, resetEquipmentFilters } = this.props.equipmentFilterFunctions;
    if (equipmentFilter.includes(event.target.value)) {
      if (equipmentFilter.length > 1) {
        removeEquipmentFilter(event.target.value);
      } else {
        resetEquipmentFilters();
      }
    }
    else {
      addEquipmentFilter(event.target.value);
    }
  }

  handleBodyFilterChange = event => {
    let { bodypartFilter, addBodyPartFilter, removeBodyPartFilter, resetBodyPartFilters } = this.props.bodyFilterFunctions;
    if (bodypartFilter.includes(event.target.value)) {
      if (bodypartFilter.length > 1) {
        removeBodyPartFilter(event.target.value);
      } else {
        resetBodyPartFilters();
      }
    }
    else {
      addBodyPartFilter(event.target.value);
    }

  }

  handleChange = event => {
    this.props.updateSearch(event.target.value);
  }

  handleNameChange = event => {
    this.setState({ workout: update(this.state.workout, {
        name: { $set: event.target.value }
      })
    })
  }

  handleOnBlur = event => {
    this.props.workoutCall(this.state.workout)
  }

  handleSubmit = event => {
    let workout = this.state.workout;
    if (workout.exerciseDescriptions.length < 1) {
      this.setState({ error: 'You must chose at least one exercise' })
    } else {
      workout.exerciseIds = this.state.workout.exerciseDescriptions.map(exercise => exercise.id)
      this.props.apiCall(workout).then((res) => {
        if (res.data.status.error) {
          Alert.error(res.data.status.errorMessage, {
            effect: 'jelly',
            timeout: 'none',
            beep: false,
          })
        } else {
          Alert.success('Success!', {
            effect: 'jelly',
            timeout: 3000,
            beep: false
          })
          this.setState(this.getInitialState());
        }
      })
    }
    event.preventDefault()
  }

  render(){
    let { bodypartFilter, searchValue, equipmentFilter } = this.props.values
    let { selectedExercise, error } = this.state
    let output = null;
    if (selectedExercise) {
      output = <ExerciseCard data={selectedExercise} key={selectedExercise.id} selectExercise={this.props.selectExercise} />
    }
    return (
    <div>
      <FilterForm handleChange={this.handleChange} handleBodyFilterChange={this.handleBodyFilterChange} handleEquipmentChange={this.handleEquipmentChange} bodypartFilter={bodypartFilter} searchValue={searchValue} equipmentFilter={equipmentFilter} />
      <WorkoutForm error={error} selectExercise={this.props.selectExercise} state={this.state} handleSubmit={this.handleSubmit} onDragEnd={this.onDragEnd} handleNameChange={this.handleNameChange} output={output} handleOnBlur={this.handleOnBlur}/>
    </div>
    )
  }
}

export default SubmitWorkout;
