/** @jsx jsx */
import {jsx} from '@emotion/core';
import PropTypes from 'prop-types';
import React from 'react';
import {Dialog, DialogOverlay, DialogContent} from '@reach/dialog';
import '@reach/dialog/styles.css';

export default function EventWrapper({event}) {
  const [showDialog, setShowDialog] = React.useState(false);
  const open = () => setShowDialog(true);
  const close = () => setShowDialog(false);

  return (
    <>
      <div
        /* eslint-disable-next-line react/no-danger */
        dangerouslySetInnerHTML={{__html: event.name}}
        css={{
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis'
        }}
        onClick={open}
      />
      <Dialog isOpen={showDialog} onDismiss={close}>
        <header>
          <h1>
            {/* eslint-disable-next-line react/no-danger */}
            <span dangerouslySetInnerHTML={{__html: event.name}} />
          </h1>
          <button aria-label="close" type="button" onClick={close}>
            <svg
              aria-hidden="true"
              focusable="false"
              role="img"
              viewBox="0 0 24 24"
            >
              <g>
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
              </g>
            </svg>
          </button>
        </header>
        <h4>
          {event.start_time} - {event.end_time}
        </h4>
        <dl>
          <dt>Location</dt>
          <dd>{event.location}</dd>
        </dl>
        {/* eslint-disable-next-line react/no-danger */}
        <section dangerouslySetInnerHTML={{__html: event.description}} />
        <footer>
          <button type="button" onClick={close}>
            Close
          </button>
          <button type="button" onClick={close}>
            View
          </button>
        </footer>
      </Dialog>
    </>
  );
}

EventWrapper.propTypes = {
  event: PropTypes.PropTypes.shape({
    name: PropTypes.string.isRequired
  }).isRequired
};
