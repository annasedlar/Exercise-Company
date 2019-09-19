import React, { Component } from 'react';
import './ExerciseCard.css'
import { Row, Button, Col } from 'react-materialize';
import { Link } from 'react-router-dom';

class ExerciseListItem extends Component {
  render(){
    let { selectExercise, data } = this.props
    let equipment;
    if (data.equipment) {
      equipment = data.equipment.map((item, i) => {
        return (
          <p key={i}>{item}</p>
        )
      })
    }
    // For now bodyTypes is an array with just one element in it because of legacy code
    return (
      <Row className="ex-cards">
      <Col s={2}>
        <h1>{data.name}</h1>
      </Col>
      <Col s={2} offset="s1 m1 l1 xl1">
        <div className="equip">
          <p className="card-info">Focus Area</p>
          <p>{data.bodyTypes[0]}</p>
        </div>
      </Col>
      <Col s={2} offset="s1 m1 l1 xl1">
        {data.equipment ? (
          <div className="equip">
            <p className="card-info">Equipment</p>
            {equipment}
          </div>
        ) : <p>No Equipment Needed</p>
      }
      </Col>
      <Col s={4} className="view-edit-buttons">
        <Link data-test="exercise-view-button" to={`/exercises/${data.id}`}>
          <Button onClick={() => selectExercise(data)}>
          View
          </Button>
        </Link>
        <Link data-test="edit-exercise-button" to={`/exercise/edit/${data.id}`}>
          <Button onClick={() => selectExercise(data)}>
            Edit
						</Button>
					</Link>
				</Col>
			</Row>
		)
	}
}

export default ExerciseListItem
