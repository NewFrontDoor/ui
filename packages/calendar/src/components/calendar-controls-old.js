/** @jsx jsx */
import {jsx, Flex, Heading, Button, Box} from 'theme-ui';
import PropTypes from 'prop-types';
import {format} from 'date-fns';
import {useCalendarDispatch} from '../utilities/calendar-dispatch-provider';
import MethodToggle from './method-toggle';

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
    <Flex sx={{marginBottom: '10px'}}>
      <Box sx={{flex: '1 1 20%'}}>
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
          Today
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
      <Box sx={{flex: '3 1 50%'}}>
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
      <Box sx={{flex: '1 1 20%'}}>
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
    </Flex>
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
