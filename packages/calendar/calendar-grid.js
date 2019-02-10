import React from 'react';
import PropTypes from 'prop-types';
import {format} from 'date-fns/esm';
import styled, {cx, css} from 'react-emotion';
import CalendarControls from './calendar-controls';
import EventWrapper from './event-wrapper';

const Week = styled('div')`
  display:grid;
  grid-template-columns: 30px repeat(7, 4fr);
  grid-template-rows: 30px;
  grid-auto-rows: 120px;
  grid-auto-flow: dense;
  grid-gap: 2px 10px;
  .week-day, .day-label, .event {
    padding: 2px 10px;
  }

  .week-day, .day-label {
    height: 1rem;
    font-size: 20px;
    text-align: left;
    font-family: 'helvetica';
    font-weight: 300;
    margin: 0;
  }

  .day-label {
    grid-row-start: 1;
    padding: 5px 0 0 10px;
  }

  .event {
    background-color: #CCC;
    height: 20px;
  }

  .event-end { 
    border-top-right-radius: 5px; 
    border-bottom-right-radius: 5px; 
  }

  .event-start { 
    border-top-left-radius: 5px; 
    border-bottom-left-radius: 5px; 
  }

  .day {
    display:contents;
    background-color: #DDD; /* if display contents, this won't color */
  }

  .day:nth-child(1) > .event { grid-column-start: 1; }
  .day:nth-child(2) > .event { grid-column-start: 2; }
  .day:nth-child(3) > .event { grid-column-start: 3; }
  .day:nth-child(4) > .event { grid-column-start: 4; }
  .day:nth-child(5) > .event { grid-column-start: 5; }
  .day:nth-child(6) > .event { grid-column-start: 6; }
  .day:nth-child(7) > .event { grid-column-start: 7; }

  [data-span="1"] { grid-column-end: span 1; }
  [data-span="2"] { grid-column-end: span 2; }
  [data-span="3"] { grid-column-end: span 3; }
  [data-span="4"] { grid-column-end: span 4; }
  [data-span="5"] { grid-column-end: span 5; }
  [data-span="6"] { grid-column-end: span 6; }
  [data-span="7"] { grid-column-end: span 7; }
`;

export default class Calendar extends React.Component {
  render() {
    console.log(this.props.monthData)
    console.log(this.props.events)
    return (
      <div>
        <CalendarControls
          month={this.props.month}
          year={this.props.year}
          location="top"
          handleChange={this.props.handleChange}
          changeMonth={this.props.changeMonth}
          valueMethod={this.props.valueMethod}
        />
        <Week>
          <div className="week-day">Wk</div>
          <div className="week-day">Sunday</div>
          <div className="week-day">Monday</div>
          <div className="week-day">Tuesday</div>
          <div className="week-day">Wednesday</div>
          <div className="week-day">Thursday</div>
          <div className="week-day">Friday</div>
          <div className="week-day">Saturday</div>  
        </Week>
        {this.props.monthData.map((week, index) => (
          <Week>
          <div className="day">
            <h4 className="day-label">{this.props.weekNumber + index}</h4>
          </div>
          {week.map((day, index) => (
              <div className="day">
                <h4 className="day-label">{day[0]}</h4>
                {day[3] ? <div className="event event-start event-end" data-span="">{day[3].name}</div> : ''} 
              </div>
            )
          )}</Week>
          )
        )}
      </div> 
    );
  }
}

Calendar.propTypes = {
  year: PropTypes.number.isRequired,
  weekNumber: PropTypes.number.isRequired,
  month: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  valueMethod: PropTypes.string.isRequired,
  monthData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.array).isRequired)
    .isRequired,
  monthEvents: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.array).isRequired)
    .isRequired,
  changeMonth: PropTypes.func.isRequired,
  today: PropTypes.array.isRequired
};
