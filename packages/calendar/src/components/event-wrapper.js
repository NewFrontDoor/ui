/** @jsx jsx */
import {jsx} from '@emotion/core';
import PropTypes from 'prop-types';
import React from 'react';
import styled from '@emotion/styled';
import {Dialog} from '@reach/dialog';

import '@reach/dialog/styles.css';

const Footer = styled('footer')`
  display: grid;
  grid-template-columns: 1fr 100px 100px;
  grid-template-rows: auto;
  grid-gap: 20px;
  button {
    border-radius: none;
    height: 30px;
  }
`;

const EventWrapper = ({event, handleNav}) => {
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
      <Dialog isOpen={showDialog} style={{zIndex: 1000}} onDismiss={close}>
        <header>
          <h1>
            {/* eslint-disable-next-line react/no-danger */}
            <span dangerouslySetInnerHTML={{__html: event.name}} />
          </h1>
        </header>
        <h4>
          {event.start_time} - {event.end_time}
        </h4>
        <p>
          Location
          <span style={{marginLeft: '40px'}}>{event.location}</span>
        </p>
        {/* eslint-disable-next-line react/no-danger */}
        <section dangerouslySetInnerHTML={{__html: event.description}} />
        <Footer>
          <button
            type="button"
            style={{gridColumnStart: `${event.url ? 2 : 3}`}}
            onClick={close}
          >
            Close
          </button>
          {event.url && (
            <button type="button" onClick={() => handleNav(event.url)}>
              View
            </button>
          )}
        </Footer>
      </Dialog>
    </>
  );
};

EventWrapper.propTypes = {
  event: PropTypes.PropTypes.shape({
    name: PropTypes.string.isRequired
  }).isRequired,
  handleNav: PropTypes.func
};

export default EventWrapper;
