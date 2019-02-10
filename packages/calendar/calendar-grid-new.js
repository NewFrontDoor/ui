import React from 'react';
import PropTypes from 'prop-types';
import {
  format,
  getWeek,
  startOfMonth,
  addMonths,
  subMonths,
  lastDayOfMonth
} from 'date-fns/esm';
import styled, {cx, css} from 'react-emotion';
import CalendarControls from './calendar-controls';
import EventWrapper from './event-wrapper';

const body = css`
background: #f5f7fa;
  padding: 40px 0;
  box-sizing: border-box;
  font-family: Montserrat, "sans-serif";
  color: #51565d;
`

const CalendarBody = styled('div')`
  display:grid;
  grid-template-columns: repeat(7, 4fr);
  grid-template-rows: 50px;
  grid-auto-rows: 120px;
  grid-auto-flow: dense;
  grid-gap: 0rem;
  .week-day {
    font-size: 12px;
    text-transform: uppercase;
    color: #99a1a7;
    text-align: center;
    border-bottom: 1px solid rgba(166, 168, 179, 0.12);
    line-height: 50px;
    font-weight: 500;
  }
  .day {
    border-bottom: 1px solid rgba(166, 168, 179, 0.12);
    border-right: 1px solid rgba(166, 168, 179, 0.12);
    padding: 14px 20px;
    text-align: right;
    letter-spacing: 1px;
    font-size: 12px;
    box-sizing: border-box;
    color: #98a0a6;
    position: relative;
    pointer-events: none;
    z-index: 1;
  }

.day:nth-of-type(7n + 7) {
  border-right: 0;
}
.day:nth-of-type(n + 1):nth-of-type(-n + 7) {
  grid-row: 1;
}
.day:nth-of-type(n + 8):nth-of-type(-n + 14) {
  grid-row: 2;
}
.day:nth-of-type(n + 15):nth-of-type(-n + 21) {
  grid-row: 3;
}
.day:nth-of-type(n + 22):nth-of-type(-n + 28) {
  grid-row: 4;
}
.day:nth-of-type(n + 29):nth-of-type(-n + 35) {
  grid-row: 5;
}
.day:nth-of-type(n + 36):nth-of-type(-n + 42) {
  grid-row: 6;
}
.day:nth-of-type(7n + 1) {
  grid-column: 1/1;
}
.day:nth-of-type(7n + 2) {
  grid-column: 2/2;
}
.day:nth-of-type(7n + 3) {
  grid-column: 3/3;
}
.day:nth-of-type(7n + 4) {
  grid-column: 4/4;
}
.day:nth-of-type(7n + 5) {
  grid-column: 5/5;
}
.day:nth-of-type(7n + 6) {
  grid-column: 6/6;
}
.day:nth-of-type(7n + 7) {
  grid-column: 7/7;
}`

const Event = styled.section(
  {
    borderLeftWidth: "3px",
    padding: "8px 12px",
    margin: "10px",
    borderLeftStyle: "solid",
    borderLeftColor: "#fdb44d",
    background: "#fef0db",
    color: "#fc9b10",
    alignSelf: "center",
    marginTop: "-5px",
    fontSize: "14px",
    position: "relative"
  },
  props => ({gridColumnStart: props.col, gridRowStart: props.row, gridRowEnd: props.row, gridColumnEnd: `span ${props.span}` })
)

export default class Calendar extends React.Component {
  render() {
    console.log(this.props.monthData)
    console.log(this.props.events)
    return (
      <div css={body}>
        <CalendarControls
          month={this.props.month}
          year={this.props.year}
          location="top"
          handleChange={this.props.handleChange}
          changeMonth={this.props.changeMonth}
          valueMethod={this.props.valueMethod}
        />
        <CalendarBody>
          <div className="week-day">Sunday</div>
          <div className="week-day">Monday</div>
          <div className="week-day">Tuesday</div>
          <div className="week-day">Wednesday</div>
          <div className="week-day">Thursday</div>
          <div className="week-day">Friday</div>
          <div className="week-day">Saturday</div>  
          {this.props.monthData.map((day, index) => <div className="day">{day[0]}</div>)}
          {this.props.events.map((event, index) =>
            {
              const startDate = parseInt(format(event.start_date, "d"));
              const offset = this.props.firstDay;
              const actual = startDate + offset;
              return (
                <Event
                  col={
                    (actual % 7) + 1
                  }
                  row={
                    Math.floor(actual/7) + 1
                  }
                  span={parseInt((format(event.end_date, 'd'))) - startDate + 1}
                >
                  {event.name}
                </Event>
              )
            }
          )}
        </CalendarBody>
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
