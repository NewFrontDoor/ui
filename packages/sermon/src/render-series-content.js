/** @jsx jsx */
import PropTypes from 'prop-types';
import {jsx, Styled} from 'theme-ui';

const RenderSeriesComponent = ({id, title, image, link}) => {
  return (
    <div key={id}>
      <img src={image} alt="Sermon Art" />
      <Styled.p>
        <Styled.a dangerouslySetInnerHTML={{__html: title}} href={link} />
      </Styled.p>
    </div>
  );
};

RenderSeriesComponent.propTypes = {
  id: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};

export default RenderSeriesComponent;
