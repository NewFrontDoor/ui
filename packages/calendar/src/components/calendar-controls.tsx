/** @jsx jsx */
import {jsx, Heading, Button, Box} from 'theme-ui';
import {FC} from 'react';
import PropTypes from 'prop-types';
import {format} from 'date-fns';
import {calendarViews, CalendarView} from '../types';
import {useCalendarDispatch} from '../use-calendar-events';
import MethodToggle from './method-toggle';

type CalendarControlsProps = {
  location: string;
  input: string[];
  calendarView: CalendarView;
  isViewFixed: boolean;
  startOfMonth: Date;
};

const CalendarControls: FC<CalendarControlsProps> = ({
  location,
  calendarView,
  input,
  isViewFixed,
  startOfMonth
}) => {
  const dispatch = useCalendarDispatch();
  let jump: 'week' | 'month' | 'year';

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
    <div
      sx={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gridTemplateRows: 'auto',
        gridTemplateAreas: `'title title' 'left right'`,
        '@media (min-width: 700px)': {
          gridTemplateColumns: '2fr 5fr 2fr',
          gridTemplateAreas: "'left title right'"
        }
      }}
    >
      <Box sx={{gridArea: 'left'}}>
        <Button
          variant="calendar"
          aria-label={`previous ${jump}`}
          onClick={() => dispatch({type: `decrement-jump`})}
        >
          &lt;&lt;
        </Button>
        <Button
          variant="calendar"
          aria-label={`previous ${calendarView}`}
          onClick={() => dispatch({type: `decrement-step`})}
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
          onClick={() => dispatch({type: `increment-step`})}
        >
          &gt;
        </Button>
        <Button
          variant="calendar"
          aria-label={`next ${jump}`}
          onClick={() => dispatch({type: `increment-jump`})}
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
            sx={{
              borderRadius: 0
            }}
          />
        )}
      </Box>
    </div>
  );
};

CalendarControls.propTypes = {
  calendarView: PropTypes.oneOf(calendarViews).isRequired,
  location: PropTypes.string.isRequired,
  input: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  isViewFixed: PropTypes.bool,
  startOfMonth: PropTypes.instanceOf(Date).isRequired
};

CalendarControls.defaultProps = {
  isViewFixed: false
};

export default CalendarControls;
