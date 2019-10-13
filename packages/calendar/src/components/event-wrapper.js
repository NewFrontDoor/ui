/** @jsx jsx */
import {jsx} from '@emotion/core';
import PropTypes from 'prop-types';
import React from 'react';
import {Text} from 'mineral-ui';
import Dialog, {DialogTitle} from 'mineral-ui/Dialog';

class EventWrapper extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    };

    this.toggleDialog = this.toggleDialog.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  toggleDialog() {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen
    }));
  }

  handleClose() {
    this.setState({
      isOpen: false
    });
  }

  render() {
    const {isOpen} = this.state;
    const {...event} = this.props.event;
    return (
      <>
        <div
          dangerouslySetInnerHTML={{__html: event.name}}
          css={{
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis'
          }}
          /* eslint-disable-next-line react/no-danger */
          onClick={this.toggleDialog}
        />
        <Dialog
          showCloseButton
          title={
            <DialogTitle>
              <span dangerouslySetInnerHTML={{__html: event.name}} />
            </DialogTitle>
          }
          actions={[
            {onClick: this.toggleDialog, text: 'Close'},
            {onClick: this.toggleDialog, text: 'View'}
          ]}
          isOpen={isOpen}
          onClose={this.handleClose}
        >
          <Text as="h4">
            {event.start_time} - {event.end_time}
          </Text>
          <dl>
            <Text as="dt">Location</Text>
            <Text as="dd">{event.location}</Text>
          </dl>
          {/* eslint-disable-next-line react/no-danger */}
          <section dangerouslySetInnerHTML={{__html: event.description}} />
        </Dialog>
      </>
    );
  }
}

EventWrapper.propTypes = {
  event: PropTypes.PropTypes.shape({
    name: PropTypes.string.isRequired
  }).isRequired
};

export default EventWrapper;
