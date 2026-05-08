
import {Button} from 'theme-ui';
import type { FC} from 'react';
import {useState} from 'react';
import {createPortal} from 'react-dom';

import type {CalendarEvent} from '../types';

type EventWrapper = {
  event: Partial<CalendarEvent>;
  handleNav?: (url: string) => void;
};

const EventWrapper: FC<EventWrapper> = ({event, handleNav}) => {
  const [showDialog, setShowDialog] = useState(false);
  const dialog =
    showDialog && typeof document !== 'undefined'
      ? createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label={event.name}
            sx={{
              position: 'fixed',
              inset: 0,
              zIndex: 1000,
              backgroundColor: 'rgba(0, 0, 0, 0.35)',
              display: 'grid',
              placeItems: 'center',
              padding: 3
            }}
            onClick={() => setShowDialog(false)}
          >
            <section
              sx={{
                backgroundColor: 'background',
                color: 'text',
                maxWidth: '640px',
                width: '100%',
                padding: 4,
                boxShadow: '0 20px 50px rgba(0, 0, 0, 0.2)'
              }}
              onClick={(event) => event.stopPropagation()}
            >
              {event.name && (
                <header>
                  <h1>
                    { }
                    <span dangerouslySetInnerHTML={{__html: event.name}} />
                  </h1>
                </header>
              )}
              <h4>
                {event.startTime} - {event.endTime}
              </h4>
              <p>
                Location
                <span style={{marginLeft: '40px'}}>{event.location}</span>
              </p>
              {event.description && (
                 
                <section dangerouslySetInnerHTML={{__html: event.description}} />
              )}
              <footer
                sx={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 100px 100px',
                  gridTemplateRows: 'auto',
                  gap: '20px'
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
                  <Button
                    type="button"
                    onClick={() => handleNav && event.url && handleNav(event.url)}
                  >
                    View
                  </Button>
                )}
              </footer>
            </section>
          </div>,
          document.body
        )
      : null;

  return (
    <>
      {event.name && (
        <div
           
          dangerouslySetInnerHTML={{__html: event.name}}
          sx={{
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis'
          }}
          onClick={() => setShowDialog(true)}
        />
      )}
      {dialog}
    </>
  );
};

/* EventWrapper.propTypes = {
  event: PropTypes.shape({
    name: PropTypes.string.isRequired,
    startTime: PropTypes.string.isRequired,
    endTime: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired
  }).isRequired,
  handleNav: PropTypes.func
}; */

export default EventWrapper;
