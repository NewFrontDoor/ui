import React from 'react';
import {PortalWithState} from 'react-portal';
import Modal from './components/modal';
import EventModal from './components/event-modal';

class EventWrapper extends React.Component {
  render() {
    return (
      <PortalWithState
        key={this.props.event.name + '-portal'}
        closeOnOutsideClick
        closeOnEsc
      >
        {({openPortal, closePortal, portal}) => [
          <div
            key={this.props.event.name + '-portal-button'}
            style={{
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis"
            }}
            onClick={openPortal}
          >
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
