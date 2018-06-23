import React from 'react';
import PropTypes from 'prop-types';
import {PortalWithState} from 'react-portal';
import EventSquare from './event-date-square';
import Modal from './modal';
import EventModal from './event-modal';
import CalendarControls from './calendar-controls';

export default class Calendar extends React.Component {
  render() {
    return (
      <div>
        <CalendarControls month={this.props.month} />
        <div>
          {this.props.events.map(event => (
            <PortalWithState
              key={event.name + '-portal'}
              closeOnOutsideClick
              closeOnEsc
            >
              {({openPortal, closePortal, portal}) => [
                <EventSquare
                  key={event.name}
                  name={event.name}
                  onClick={openPortal}
                />,
                portal(
                  <Modal closeClick={closePortal}>
                    <EventModal {...event} />
                  </Modal>
                )
              ]}
            </PortalWithState>
          ))}
        </div>
        <CalendarControls month={this.props.month} />
      </div>
    );
  }
}

Calendar.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      picture: PropTypes.string,
      // eslint-disable-next-line camelcase
      calendar_id: PropTypes.string.isRequired,
      interval: PropTypes.string,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      // eslint-disable-next-line camelcase
      admin_notes: PropTypes.string,
      where: PropTypes.string,
      // eslint-disable-next-line camelcase
      start_date: PropTypes.string.isRequired,
      // eslint-disable-next-line camelcase
      end_date: PropTypes.string.isRequired,
      // eslint-disable-next-line camelcase
      all_day: PropTypes.string.isRequired,
      url: PropTypes.string,
      color: PropTypes.string,
      locations: PropTypes.object
    })
  ).isRequired,
  month: PropTypes.string.isRequired
};
