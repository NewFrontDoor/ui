import React from 'react';
import {Dialog, Text, Button} from 'mineral-ui';

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
    console.log('trying to open');
    this.setState(prevState => ({
      isOpen: !prevState.isOpen
    }));
  }

  handleClose() {
    this.setState(prevState => ({
      isOpen: false
    }));
  }
  
  render() {
    const { isOpen } = this.state;
    const {...event} = this.props.event;

    return [
      <Text onClick={this.toggleDialog}>{this.props.children}</Text>,
      <Dialog
        title={event.name}
        actions={[{onClick: this.toggleDialog, text: 'Close'}, {onClick: this.toggleDialog, text: 'View'}]}
        isOpen={isOpen}
        onClose={this.handleClose}
      >
        <Text as="h4">{event.start_time} - {event.end_time}</Text>
        <dl>
          <Text as="dt">Location</Text>
          <Text as="dd">{event.location}</Text>
        </dl>
        <section dangerouslySetInnerHTML={{__html: event.description}} />
      </Dialog>
    ];
  }
}

export default EventWrapper;
