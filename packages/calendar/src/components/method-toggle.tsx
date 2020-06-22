/** @jsx jsx */
import {jsx, Label} from 'theme-ui';
import {FC, Fragment} from 'react';
import PropTypes from 'prop-types';
import {hideVisually} from 'polished';
import {calendarViews, CalendarView} from '../types';
import {useCalendarDispatch} from '../use-calendar-events';

type MethodToggleProps = {
  inputs: string[];
  calendarView: CalendarView;
  location: string;
};

const MethodToggle: FC<MethodToggleProps> = (props) => {
  const dispatch = useCalendarDispatch();

  return (
    <div
      id="methodField"
      sx={{
        height: `30px`,
        margin: '0 10px',
        position: 'relative',
        display: 'flex'
      }}
    >
      {props.inputs.map((input, index) => [
        <Fragment key={input}>
          <input
            type="radio"
            value={input}
            id={props.location + input}
            checked={input === props.calendarView}
            sx={{
              ...hideVisually(),
              [`&:nth-of-type(${
                index + 1
              }):checked~label:last-of-type:before`]: {
                transform: `translate3d(${index * 100}%, 0, 0)`,
                transition: `all .275s ease-out`,
                willChange: 'transform, transition'
              }
            }}
            onChange={(event) => {
              const view = event.target.value as CalendarView;
              dispatch({type: 'set-view', view});
            }}
          />
          <Label
            htmlFor={props.location + input}
            sx={{
              display: 'inline-block',
              width: `calc(100% / ${props.inputs.length})`,
              textAlign: `center`,
              textTransform: `uppercase`,
              verticalAlign: `middle`,
              flexBasis: `calc(100% / ${props.inputs.length})`,
              minHeight: '30px',
              lineHeight: `30px`,
              transition: 'all 0.275s ease-out',

              '&:hover': {
                cursor: 'pointer'
              },

              'input:checked + label': {
                color: `white`
              },

              '&:first-of-type': {
                borderRadius: '2px 0 0 2px'
              },
              'label:last-of-type': {
                borderRadius: '0 2px 2px 0'
              },

              '&:before': {
                content: "''",
                width: '100%',
                height: '30px',
                position: 'absolute',
                backgroundColor: '#e4e4e4',
                top: 0,
                left: 0,
                zIndex: -2,
                borderRadius: '2px'
              },

              '&:last-of-type:before': {
                content: "''",
                width: `calc(100% / ${props.inputs.length})`,
                height: '30px',
                position: 'absolute',
                backgroundColor: '#3cba54',
                top: 0,
                left: 0,
                zIndex: -1,
                transform: 'translate3d(0, 0, 0)',
                transition: 'all 0.275s ease-out'
              }
            }}
          >
            {input}
          </Label>
        </Fragment>
      ])}
    </div>
  );
};

export default MethodToggle;

MethodToggle.propTypes = {
  location: PropTypes.string.isRequired,
  calendarView: PropTypes.oneOf(calendarViews).isRequired,
  inputs: PropTypes.arrayOf(PropTypes.string).isRequired
};
