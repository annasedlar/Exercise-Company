import React, { Component } from 'react';
import { Input } from 'react-materialize';
import './Workouts.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setWorkoutDates, clickWorkout, setSortDates } from '../../actions/workoutActions.js';

class AssignWorkoutModal extends Component {
  state = {
    formattedDates: [],
  }

  sortDates = date => {
    let dateArr = []
    let newDate = new Date(date);
    if(dateArr.length > 0){
      dateArr = this.props.workoutDates.map(date => {
        return new Date(date)
      });
    }

    if(!dateArr.includes(newDate)){
      dateArr.push(newDate);
    }

    let datesSorted = dateArr.sort((a, b)=>{
      return a - b
    })

    this.setState({formattedDates: datesSorted.map(date => {
      let dd = date.getDate()
      let mm = date.getMonth()
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June",
      "July", "Aug", "Sept", "Oct", "Nov", "Dec"
      ];
      return(monthNames[mm] + " " + dd);
      })
    })
  }

  handleDateChange = e => {
    console.log(this.props)
    let dateElements = e.target.value.split(" ");
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
      ];
    let day = dateElements[0];
    if(day.length === 1){
      day = `0${day}`;
    };
    let month = dateElements[1].replace(",", "");
    monthNames.forEach(mm => {
      if(month === mm){
        month = monthNames.indexOf(month) + 1;
      };
    });
    if(month.toString().length === 1){
      month = `0${month}`
    }
    let year = dateElements[2];
    let isoDate = `${year}-${month}-${day}`;
    this.props.setSortDates(isoDate, this.props.clickedWorkout);
  }

  dateList = () => {
    if(this.props.clickedWorkout.daysInUTC && this.props.clickedWorkout.daysInUTC !== 'No Assignments Yet') {
      return this.props.clickedWorkout.daysInUTC.map((date, i) => {
        date = date.split("T")[0].substr(5)
        return (
          <span key={i}>{date + '  -  '}</span>
        )
      })
    } else {
      return <span>No Assignment Yet</span>
    }
  }

  render() {
    let { name } = this.props;
    return(
      <div className="assign-modal">
        <Input type='date' multiple={true} placeholder='Click Here to Select Date' data-test='date-picker-modal' onChange={this.handleDateChange} />
        <div className='date-list'>
          <p>{name} - is assigned to the following dates:</p>
          <p data-test='date-list'>{this.dateList()}</p>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state){
	return {
    state: state,
    workoutDates: state.workout.clickWorkout.daysInUTC,
    clickedWorkout: state.workout.clickWorkout
	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({
    setWorkoutDates,
    clickWorkout,
    setSortDates
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AssignWorkoutModal);
