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
const CalendarHeader = styled('div')`
  display:grid;
  grid-template-columns: 50px repeat(7, 1fr);
  grid-template-rows: 1fr;
  grid-gap: 0rem;
  height: 50px;
  align-items: center;
  text-align: center;
  border-bottom: 1px solid rgba(166, 168, 179, 0.12);
  line-height: 50px;
  font-weight: 500;
  font-size: 12px;
  text-transform: uppercase;
  color: #99a1a7;
`
const CalendarBody = styled('div')`
  display:grid;
  grid-template-columns: 50px repeat(7, 1fr);
  grid-template-rows: repeat(6, repeat(4, 1fr));
  grid-auto-rows: 25px;
  grid-gap: 0rem;
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
`

const Event = styled.section(
  {
    borderLeftWidth: "3px",
    padding: "4px 12px",
    borderLeftStyle: "solid",
    borderLeftColor: "#fdb44d",
    background: "#fef0db",
    color: "#fc9b10",
    alignSelf: "center",
    fontSize: "14px",
    position: "relative"
  },
  props => ({gridColumnStart: props.col, gridRowStart: props.row, gridRowEnd: props.row, gridColumnEnd: `span ${props.span}` })
)

const Day = styled.div(
  {
    borderBottom: "1px solid rgba(166, 168, 179, 0.12)",
    borderRight: "1px solid rgba(166, 168, 179, 0.12)",
    padding: "5px 5px",
    textAlign: "right",
    letterSpacing: "1px",
    fontSize: "14px",
    boxSizing: "border-box",
    color: "#98a0a6",
    position: "relative",
    pointerEvents: "none",
    zIndex: "1",
  },
  props => ({
    gridColumn: props.column,
    gridRow: `${props.row}/${props.row + 5}`
  }) 
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
        <CalendarHeader>
          <div className="week-day">Wk</div>
          <div className="week-day">Sunday</div>
          <div className="week-day">Monday</div>
          <div className="week-day">Tuesday</div>
          <div className="week-day">Wednesday</div>
          <div className="week-day">Thursday</div>
          <div className="week-day">Friday</div>
          <div className="week-day">Saturday</div>
        </CalendarHeader>
        <CalendarBody>
          {this.props.monthData.map((week, index) => {
            const row = (index*5) + 1;
            return week.map((day, index) => <Day row={row} column={index + 2}>{day[0]}</Day>)
          })}
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
                    ((Math.floor(actual/7)) * 5) - 3
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
