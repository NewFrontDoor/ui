/** @jsx jsx */
import {jsx} from '@emotion/core';
import {useContext} from 'react';
import PropTypes from 'prop-types';
import Button from 'mineral-ui/Button';
import Text from 'mineral-ui/Text';
import Flex, {FlexItem} from 'mineral-ui/Flex';
import {format} from 'date-fns';
import CalendarDispatch from '../utilities/calendar-dispatch-provider';
import MethodToggle from './method-toggle';

export default function CalendarControls({
  location,
  calendarView,
  input,
  isViewFixed,
  startOfMonth
}) {
  const dispatch = useContext(CalendarDispatch);
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
    <Flex alignItems="start" justifyContent="between">
      <FlexItem grow={1} shrink={1} width="20%">
        <Button
          size="medium"
          aria-label={`previous ${jump}`}
          onClick={() => dispatch({type: `decrement-${jump}`})}
        >
          &lt;&lt;
        </Button>
        <Button
          size="medium"
          aria-label={`previous ${calendarView}`}
          onClick={() => dispatch({type: `decrement-${calendarView}`})}
        >
          &lt;
        </Button>
        <Button
          variant="success"
          size="medium"
          onClick={() => dispatch({type: 'today'})}
        >
          Today
        </Button>
        <Button
          size="medium"
          aria-label={`next ${calendarView}`}
          onClick={() => dispatch({type: `increment-${calendarView}`})}
        >
          &gt;
        </Button>
        <Button
          size="medium"
          aria-label={`next ${jump}`}
          onClick={() => dispatch({type: `increment-${jump}`})}
        >
          &gt;&gt;
        </Button>
      </FlexItem>
      <FlexItem grow={3} shrink={1} width="50%">
        <Text as="h2" align="center" data-testid="calendar-title">
          {calendarView === 'day'
            ? format(startOfMonth, 'yyyy')
            : format(startOfMonth, 'MMMM - yyyy')}
        </Text>
      </FlexItem>
      <FlexItem grow={1} shrink={1} width="20%">
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
      </FlexItem>
    </Flex>
  );
}

CalendarControls.propTypes = {
  calendarView: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  input: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  isViewFixed: PropTypes.bool
};

CalendarControls.defaultProps = {
  isViewFixed: false
};
