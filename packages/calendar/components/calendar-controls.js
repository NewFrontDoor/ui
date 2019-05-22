/** @jsx jsx */
import {jsx} from '@emotion/core';
import {useContext} from 'react';
import PropTypes from 'prop-types';
import Button from 'mineral-ui/Button';
import Text from 'mineral-ui/Text';
import Flex, {FlexItem} from 'mineral-ui/Flex';
import {format} from 'date-fns/esm';
import CalendarDispatch from '../utilities/calendar-dispatch-provider';
import MethodToggle from './method-toggle';

export default function CalendarControls({
  location,
  currentDate,
  calendarView,
  setCalendarView
}) {
  const dispatch = useContext(CalendarDispatch);

  return (
    <Flex alignItems="start" justifyContent="between">
      <FlexItem grow={1} shrink={1} width="20%">
        <Button
          size="medium"
          onClick={() => dispatch({type: 'decrement-year'})}
        >
          &lt;&lt;
        </Button>
        <Button
          size="medium"
          onClick={() => dispatch({type: 'decrement-month'})}
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
          onClick={() => dispatch({type: 'increment-month'})}
        >
          &gt;
        </Button>
        <Button
          size="medium"
          onClick={() => dispatch({type: 'increment-year'})}
        >
          &gt;&gt;
        </Button>
      </FlexItem>
      <FlexItem grow={3} shrink={1} width="50%">
        <Text as="h2" align="center">
          {format(currentDate, 'MMMM - yyyy')}
        </Text>
      </FlexItem>
      <FlexItem grow={1} shrink={1} width="20%">
        <MethodToggle
          setCalendarView={setCalendarView}
          calendarView={calendarView}
          location={location}
          inputs={['day', 'week', 'month']}
          styles={{
            borderRadius: 0
          }}
        />
      </FlexItem>
    </Flex>
  );
}

CalendarControls.propTypes = {
  setCalendarView: PropTypes.func.isRequired,
  calendarView: PropTypes.string.isRequired,
  currentDate: PropTypes.instanceOf(Date).isRequired,
  location: PropTypes.string.isRequired
};
