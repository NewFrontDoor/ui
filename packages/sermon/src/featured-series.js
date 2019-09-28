import React from 'react';
import Card, {
  CardActions,
  CardBlock,
  CardDivider,
  CardFooter,
  CardImage,
  CardTitle
} from 'mineral-ui/Card';

class FeaturedSeries extends React.PureComponent {
  render() {
    const {header, seriesTitle, seriesUrl, artUrl, ...props} = this.props;

    return (
      <Card>
        <CardTitle>Featured Series</CardTitle>
        <CardImage src={this.props.artUrl} alt="Sermon Art" />
        <CardBlock>{this.props.seriesTitle}</CardBlock>
      </Card>
    );
  }
}

export default FeaturedSeries;
