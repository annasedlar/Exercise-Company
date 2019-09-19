import React, { Component } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Input, Button, Icon, Modal } from 'react-materialize'
import { getItemStyle, getListStyle } from './WorkoutFormHelper'
import './workoutform.css'
import { Link } from 'react-router-dom';

class WorkoutForm extends Component {
	render() {
		let { state, handleSubmit, onDragEnd, handleNameChange, handleOnBlur, error } = this.props;
		return (
			<form onSubmit={handleSubmit}>
				<div className="exercise-list">
					<div className="workout-name-input">
						<Input name="workoutName" required data-test="workout-name" className="workout-name-input" label="Workout Name" value={state.workout.name} onChange={handleNameChange} onBlur={handleOnBlur}/>
					</div>
					<DragDropContext onDragEnd={onDragEnd}>
						<Droppable droppableId="workoutExercises" >
							{(provided, snapshot) => (
								<div
								className="workout-exercises"
									data-test="droppable-workout-exercises"
									ref={provided.innerRef}
									style={getListStyle(snapshot.isDraggingOver)}>
									{state.workout.exerciseDescriptions.map((item, index) => (
										<Draggable
											key={item.id}
											draggableId={item.id}
											index={index}
										>
											{(provided, snapshot) => (
												<div
													data-test="workout-exercises"
													ref={provided.innerRef}
													{...provided.draggableProps}
													{...provided.dragHandleProps}
													style={getItemStyle(
														snapshot.isDragging,
														provided.draggableProps.style
													)}
												>
												<div className="draggable-info">
													<p>{index + 1}. {item.name}</p>
													<Modal
														header={item.name}
														data-test="workout-exercise-info-modal"
														modalOptions={{dismissible: true}}
														trigger={<Button data-test="workout-exercise-modal-button">View</Button>}
														>
															<div className="basic-info">
																<div>
																	<h5>Score Based Off Reps</h5>
																	{item.repsToPoints.map((point, i) => <p key={i}>{point} reps for a score of {i + 1}</p> )}
																</div>
																<div>
																	<h5>Focus Areas</h5>
																	{item.focusAreas.map((area, i) => <p key={i}>{area}</p>)}
																</div>
																{
																	item.equipment ? (
																		<div>
																			<h5>Equipment</h5>
																			{item.equipment.map((piece, i) => <p key={i}>{piece}</p>)}
																		</div>
																	) : null
																}
															</div>
													</Modal>
												</div>
												</div>
											)}
										</Draggable>
									))}
									{provided.placeholder}
								</div>
							)}
						</Droppable>
						<Droppable droppableId="exercises">
							{(provided, snapshot) => (
								<div
									data-test="droppable-all-exercises"
									className="all-workouts"
									ref={provided.innerRef}
									style={getListStyle(snapshot.isDraggingOver)}>
									{state.exercises.map((item, index) => (
										<Draggable
											key={item.id}
											draggableId={item.id}
											index={index}
										>
											{(provided, snapshot) => (
												<div
													data-test="all-exercises"
													ref={provided.innerRef}
													{...provided.draggableProps}
													{...provided.dragHandleProps}
													style={getItemStyle(
														snapshot.isDragging,
														provided.draggableProps.style
													)}>
													<div className="draggable-info">
														<p>{index + 1}. {item.name}</p>
														<div className="draggable-buttons">
															<Modal
																header={item.name}
																data-test="exercise-info-modal"
																modalOptions={{dismissible: true}}
																trigger={<Button data-test="modal-button">View</Button>}
																>
																	<h5>Score Based Off Reps</h5>
																	{item.repsToPoints.map((point, i) => <p key={i}>{point} reps for a score of {i + 1}</p> )}
															</Modal>
															<Link data-test="edit-exercise-button" to={`/exercise/edit/${item.id}`}>
																<Button onClick={() => this.props.selectExercise(item)}>
																	Edit
																	</Button>
																</Link>
														</div>
													</div>
												</div>
											)}
										</Draggable>
									))}
									{provided.placeholder}
								</div>
							)}
						</Droppable>
					</DragDropContext>
				</div>
				{
					error.length ? (
						<div data-test="error-div" className="errorDiv">
							{error}
						</div>
					) : (
						null
					)
				}
				<Button type="submit" className="workout-submit" data-test="workout-submit-button" waves='light'>Submit<Icon left>save</Icon></Button>
			</form>
		)
	}
}

export default WorkoutForm;
