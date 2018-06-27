import React from 'react';
import PropTypes from 'prop-types';
import {cx, css} from 'react-emotion';
import CalendarControls from './calendar-controls';
import EventWrapper from './event-wrapper';

const tableStyle = css``;

const tableReset = css`
  width: 100%;
  table-layout: fixed;
  border-spacing: 4px 2px;
  th {
    vertical-align: top;
  }
`;

const headingRow = css`
  border-spacing: 4px 0px;
  th {
    height: 1rem;
    padding: 4px 0;
    vertical-align: middle;
    background: lightblue;
    text-align: center;
    font-family: 'helvetica';
  }
  th:first-of-type {
    width: 30px;
  }
`;

const weekRowHeader = css`
  th {
    height: 1rem;
    font-size: 20px;
    text-align: left;
    font-family: 'helvetica';
    font-weight: 300;
    padding: 5px 0 0 10px;
  }
  th:first-of-type {
    width: 30px;
    font-size: 15px;
    text-align: center;
    font-weight: 500;
    padding: 0;
  }
`;

const weekRow = css`
  td {
    height: 1rem;
    font-size: 14px;
    padding: 2px 2px;
    border: 1px solid #ccc;
    text-align: left;
    border-radius: 2px;
    margin: 4px;
  }
  td:first-of-type {
    width: 30px;
  }
`;

const infill = css`
  td {
    background-color: #e7e7e7;
  }
  .next,
  .prev {
    background-color: #f8f8f8;
  }
  .today {
    background-color: #bbb;
  }
  td:first-of-type {
    width: 30px;
    background-color: #0000;
  }
`;

const fcWidgetContent = css`
  padding: 0;
  border: none;
  vertical-align: top;
`;
const fcDayGridContainer = css`
  height: auto;
  overflow: hidden;
`;
const fcDayGrid = css``;
const fcRow = css`
  border-style: solid;
  border-width: 0;
  z-index: 1;
  min-height: 4em;
  position: relative;
`;
const fcBg = css`
  z-index: 1;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  table {
    height: 100%;
    width: 100%;
  }
  td {
    padding: 0;
  }
`;
const tableFirst = css`
  width: 54px;
`;
const fcContentSkeleton = css`
  position: relative;
  z-index: 4;
  padding-bottom: 2px;
`;

export default class Calendar extends React.Component {
  render() {
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
        <div>
          <table className={cx(tableReset, headingRow)}>
            <tbody>
              <tr>
                <td>
                  <div>
                    <table className={cx(tableReset, headingRow)}>
                      <thead>
                        <tr>
                          <th>Wk</th>
                          <th>Sun</th>
                          <th>Mon</th>
                          <th>Tues</th>
                          <th>Wed</th>
                          <th>Thur</th>
                          <th>Fri</th>
                          <th>Sat</th>
                        </tr>
                      </thead>
                    </table>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <table className={tableReset}>
            <tbody>
              <tr>
                <td className={fcWidgetContent}>
                  <div className={fcDayGridContainer}>
                    <div className={fcDayGrid}>
                      {this.props.monthData.map((row, index) => (
                        <div key={row[0] + '-row'} className={fcRow}>
                          <div className={fcBg}>
                            <table className={cx(tableReset)}>
                              <tbody>
                                <tr className={infill}>
                                  <td className={tableFirst} />
                                  {row.map(item => (
                                    <td
                                      key={item[0] + '-bg'}
                                      className={
                                        this.props.today[0] === item[0] &&
                                        this.props.today[1] ===
                                          this.props.month.int &&
                                        this.props.today[2] === this.props.year
                                          ? 'today'
                                          : item[1]
                                      }
                                    />
                                  ))}
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          <div className={fcContentSkeleton}>
                            <table className={cx(tableStyle, tableReset)}>
                              <thead>
                                <tr className={weekRowHeader}>
                                  <th>{this.props.weekNumber + index}</th>
                                  {row.map(date => (
                                    <th key={date[0]}>{date[0]}</th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody>
                                {this.props.monthEvents[
                                  this.props.weekNumber + index
                                ].map((row, position) => (
                                  <tr
                                    key={
                                      this.props.weekNumber +
                                      index +
                                      ' - eventRow ' +
                                      position +
                                      1
                                    }
                                  >
                                    <th />
                                    {row.map(
                                      item =>
                                        item === null ? (
                                          <td />
                                        ) : (
                                          <td key={item.id}>{item.name}</td>
                                        )
                                    )}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
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
