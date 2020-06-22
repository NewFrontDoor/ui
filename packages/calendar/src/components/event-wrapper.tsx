/** @jsx jsx  */

import {jsx, Button} from 'theme-ui';
import React, {useState, FC} from 'react';
import PropTypes from 'prop-types';
import {Dialog} from '@reach/dialog';

import '@reach/dialog/styles.css';

import {CalendarEvent} from '../types';

type EventWrapper = {
  event: Partial<CalendarEvent>;
  handleNav?: (url?: string) => void;
};

const EventWrapper: FC<EventWrapper> = ({event, handleNav}) => {
  const [showDialog, setShowDialog] = useState(false);

  return (
    <React.Fragment>
      <div
        /* eslint-disable-next-line react/no-danger */
        dangerouslySetInnerHTML={{__html: event.name}}
        sx={{
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis'
        }}
        onClick={() => setShowDialog(true)}
      />
      <Dialog
        aria-label={event.name}
        isOpen={showDialog}
        style={{zIndex: 1000}}
        onDismiss={() => setShowDialog(false)}
      >
        <header>
          <h1>
            {/* eslint-disable-next-line react/no-danger */}
            <span dangerouslySetInnerHTML={{__html: event.name}} />
          </h1>
        </header>
        <h4>
          {event.startTime} - {event.endTime}
        </h4>
        <p>
          Location
          <span style={{marginLeft: '40px'}}>{event.location}</span>
        </p>
        {event.description && (
          /* eslint-disable-next-line react/no-danger */
          <section dangerouslySetInnerHTML={{__html: event.description}} />
        )}
        <footer
          sx={{
            display: 'grid',
            gridTemplateColumns: '1fr 100px 100px',
            gridTemplateRows: 'auto',
            gridGap: '20px'
          }}
        >
          <Button
            type="button"
            style={{gridColumnStart: `${event.url ? 2 : 3}`}}
            onClick={() => setShowDialog(false)}
          >
            Close
          </Button>
          {event.url && (
            <Button type="button" onClick={() => handleNav(event.url)}>
              View
            </Button>
          )}
        </footer>
      </Dialog>
    </React.Fragment>
  );
};

EventWrapper.propTypes = {
  event: PropTypes.shape({
    name: PropTypes.string.isRequired,
    startTime: PropTypes.string.isRequired,
    endTime: PropTypes.string.isRequired,
    url: PropTypes.string,
    description: PropTypes.string,
    location: PropTypes.string
  }).isRequired,
  handleNav: PropTypes.func
};

export default EventWrapper;
