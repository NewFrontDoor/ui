import React from 'react';
import {PortalWithState} from 'react-portal';
import {cx, css} from 'react-emotion';
import Modal from './modal';
import EventModal from './event-modal';

class EventWrapper extends React.Component {
  render() {
    return (
      <PortalWithState
        key={this.props.name + '-portal'}
        closeOnOutsideClick
        closeOnEsc
      >
        {({openPortal, closePortal, portal}) => [
          <div key={this.props.name + '-portal-button'} onClick={openPortal}>
            {this.props.children}
          </div>,
          portal(
            <Modal closeClick={closePortal}>
              <EventModal {...this.props.event} />
            </Modal>
          )
        ]}
      </PortalWithState>
    );
  }
}

export default EventWrapper;
