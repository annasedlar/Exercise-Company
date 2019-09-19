import React, { Component } from 'react';
import { Row, Input, Button } from 'react-materialize';
import { Link } from 'react-router-dom'

class FilterForm extends Component {
	render() {
		let { handleChange, handleBodyFilterChange, handleEquipmentChange, searchValue, bodypartFilter, equipmentFilter } = this.props
		return(
			<div className="filter-form">
				<Row>
					<Input type="text" data-test="search-bar" value={searchValue} placeholder="Please Search" onChange={handleChange} />
					<Link to='/exercise/create' data-test="create-exercise-link">
						<Button>
							Create a new exercise
						</Button>
					</Link>
				</Row>
				<Row>
					<h5>Focus Area Filters</h5>
				</Row>
				<Row className="form">
					<Input type="checkbox" data-test="leg-filter" name="stuff" value="LEGS" label="Legs" onClick={handleBodyFilterChange} checked ={bodypartFilter.includes('LEGS')}/>
					<Input type="checkbox" data-test="total-body-filter" name="stuff" value="TOTAL_BODY" label="Total Body" onClick={handleBodyFilterChange} checked ={bodypartFilter.includes('TOTAL_BODY')}/>
					<Input type="checkbox" data-test="core-filter" name="stuff" value="CORE" label="Core" onClick={handleBodyFilterChange} checked ={bodypartFilter.includes('CORE')}/>
					<Input type="checkbox" name="stuff" value="CARDIO" label="Cardio" onClick={handleBodyFilterChange} checked ={bodypartFilter.includes('CARDIO')}/>
					<Input type="checkbox" name="stuff" value="BACK" label="Back" onClick={handleBodyFilterChange} checked ={bodypartFilter.includes('BACK')}/>
					<Input type="checkbox" name="stuff" value="SHOULDERS" label="Shoulders" onClick={handleBodyFilterChange} checked ={bodypartFilter.includes('SHOULDERS')}/>
					<Input type="checkbox" name="stuff" value="ARMS" label="Arms" onClick={handleBodyFilterChange} checked ={bodypartFilter.includes('ARMS')}/>
					<Input type="checkbox" name="stuff" value="CHEST" label="Chest" onClick={handleBodyFilterChange} checked ={bodypartFilter.includes('CHEST')}/>
				</Row>
				<Row>
					<h5>Equipment Filters</h5>
				</Row>
				<Row>
					<Input type="checkbox" data-test="box-filter" name="stuff" value="BOX" label="Box" onClick={handleEquipmentChange} checked ={equipmentFilter.includes('BOX')}/>
					<Input type="checkbox" data-test="bosu-filter" name="stuff" value="BOSU" label="BOSU" onClick={handleEquipmentChange} checked ={equipmentFilter.includes('BOSU')}/>
					<Input type="checkbox" name="stuff" value="DUMBBELLS" label="Dumbbells" onClick={handleEquipmentChange} checked ={equipmentFilter.includes('DUMBBELLS')}/>
					<Input type="checkbox" name="stuff" value="SLAM_BALL" label="Slam Ball" onClick={handleEquipmentChange} checked ={equipmentFilter.includes('SLAM_BALL')}/>
					<Input type="checkbox" name="stuff" value="MAT" label="Mat" onClick={handleEquipmentChange} checked ={equipmentFilter.includes('MAT')}/>
					<Input type="checkbox" name="stuff" value="TRX" label="TRX" onClick={handleEquipmentChange} checked ={equipmentFilter.includes('TRX')}/>
					<Input type="checkbox" name="stuff" value="BATTLE_ROPE" label="Battle Rope" onClick={handleEquipmentChange} checked ={equipmentFilter.includes('BATTLE_ROPE')}/>
					<Input type="checkbox" name="stuff" value="CABLE" label="Cable Machine" onClick={handleEquipmentChange} checked ={equipmentFilter.includes('CABLE')}/>
					<Input type="checkbox" name="stuff" value="N/A" label="Body Weight" onClick={handleEquipmentChange} checked ={equipmentFilter.includes('N/A')}/>
					<Input type="checkbox" name="stuff" value="KEDDLE_BELLS" label="Kettle Bells" onClick={handleEquipmentChange} checked ={equipmentFilter.includes('KEDDLE_BELLS')}/>
					<Input type="checkbox" data-test="bench-filter" name="stuff" value="BENCH" label="Bench" onClick={handleEquipmentChange} checked ={equipmentFilter.includes('BENCH')}/>
				</Row>
			</div>
		)
	}
}

export default FilterForm;
