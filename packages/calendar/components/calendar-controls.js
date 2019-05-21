import React from 'react';
import PropTypes from 'prop-types';
import Button from 'mineral-ui/Button';
import Text from 'mineral-ui/Text';
import Flex, {FlexItem} from 'mineral-ui/Flex';
import MethodToggle from './method-toggle';

export default class CalendarControls extends React.Component {
  render() {
    return (
      <Flex alignItems="start" justifyContent="between">
        <FlexItem grow={1} shrink={1} width="20%">
          <Button size="medium" onClick={() => this.props.changeMonth('dec+')}>
            &lt;&lt;
          </Button>
          <Button size="medium" onClick={() => this.props.changeMonth('dec')}>
            &lt;
          </Button>
          <Button
            variant="success"
            size="medium"
            onClick={() => this.props.changeMonth('initial')}
          >
            Today
          </Button>
          <Button size="medium" onClick={() => this.props.changeMonth('inc')}>
            &gt;
          </Button>
          <Button size="medium" onClick={() => this.props.changeMonth('inc+')}>
            &gt;&gt;
          </Button>
        </FlexItem>
        <FlexItem grow={3} shrink={1} width="50%">
          <Text as="h2" align="center">
            {this.props.month.name} - {this.props.year}
          </Text>
        </FlexItem>
        <FlexItem grow={1} shrink={1} width="20%">
          <MethodToggle
            handleChange={this.props.handleChange}
            valueMethod={this.props.valueMethod}
            location={this.props.location}
            inputs={['day', 'week', 'month']}
            styles={{
              borderRadius: 0
            }}
          />
        </FlexItem>
      </Flex>
    );
  }
}

CalendarControls.propTypes = {
  handleChange: PropTypes.func.isRequired,
  valueMethod: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
  month: PropTypes.object.isRequired,
  location: PropTypes.string.isRequired,
  changeMonth: PropTypes.func.isRequired
};
