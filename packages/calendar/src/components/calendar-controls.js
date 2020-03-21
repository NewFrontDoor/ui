/** @jsx jsx */
import {jsx, Heading, Button, Box} from 'theme-ui';
import PropTypes from 'prop-types';
import {format} from 'date-fns';
import styled from '@emotion/styled';
import {useCalendarDispatch} from '../use-calendar-events.ts';
import MethodToggle from './method-toggle';

const Outer = styled('div')`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto;
  grid-template-areas:
    'title title'
    'left right';
  @media (min-width: 700px) {
    grid-template-columns: 2fr 5fr 2fr;
    grid-template-areas: 'left title right';
  }
`;

const CalendarControls = ({
  location,
  calendarView,
  input,
  isViewFixed,
  startOfMonth
}) => {
  const dispatch = useCalendarDispatch();
  let jump;
  switch (calendarView) {
    case 'day':
      jump = 'week';
      break;
    case 'week':
      jump = 'month';
      break;
    case 'month':
      jump = 'year';
      break;
    default:
      jump = 'year';
  }

  return (
    <Outer>
      <Box sx={{gridArea: 'left'}}>
        <Button
          variant="calendar"
          aria-label={`previous ${jump}`}
          onClick={() => dispatch({type: `decrement-${jump}`})}
        >
          &lt;&lt;
        </Button>
        <Button
          variant="calendar"
          aria-label={`previous ${calendarView}`}
          onClick={() => dispatch({type: `decrement-${calendarView}`})}
        >
          &lt;
        </Button>
        <Button
          color="rgb(42, 133, 78)"
          variant="calendar"
          onClick={() => dispatch({type: 'today'})}
        >
          T
        </Button>
        <Button
          variant="calendar"
          aria-label={`next ${calendarView}`}
          onClick={() => dispatch({type: `increment-${calendarView}`})}
        >
          &gt;
        </Button>
        <Button
          variant="calendar"
          aria-label={`next ${jump}`}
          onClick={() => dispatch({type: `increment-${jump}`})}
        >
          &gt;&gt;
        </Button>
      </Box>
      <Box sx={{gridArea: 'title'}}>
        <Heading
          as="h2"
          sx={{textAlign: 'center'}}
          data-testid="calendar-title"
        >
          {calendarView === 'day'
            ? format(startOfMonth, 'yyyy')
            : format(startOfMonth, 'MMMM - yyyy')}
        </Heading>
      </Box>
      <Box sx={{gridArea: 'right'}}>
        {isViewFixed ? (
          ''
        ) : (
          <MethodToggle
            calendarView={calendarView}
            location={location}
            inputs={input}
            styles={{
              borderRadius: 0
            }}
          />
        )}
      </Box>
    </Outer>
  );
};

CalendarControls.propTypes = {
  calendarView: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  input: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  isViewFixed: PropTypes.bool
};

CalendarControls.defaultProps = {
  isViewFixed: false
};

export default CalendarControls;
