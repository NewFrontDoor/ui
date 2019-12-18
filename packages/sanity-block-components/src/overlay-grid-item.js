/** @jsx jsx */
import styled from '@emotion/styled';
import {Styled, jsx} from 'theme-ui';
import PropTypes from 'prop-types';

const Header = styled(Styled.h5)`
  grid-column: 1/1;
  grid-row: 1/1;
  text-align: left;
  margin: 10px;
  z-index: 20;
  color: white;
  align-self: end;
`;

const Image = styled.img`
  grid-row: 1/1;
  grid-column: 1/1;
  width: 100%;
`;

const ShadedOverlay = styled.div`
  grid-row: 1/1;
  grid-column: 1/1;
  width: 100%;
  background: rgba(0, 0, 0, 0.2);
  z-index: 19;
`;

export default function Overlay({title, image, link, LinkComponent}) {
  return (
    <LinkComponent url={link} sx={{display: 'contents'}}>
      <Image src={image} alt={title} />
      <ShadedOverlay />
      <Header>{title}</Header>
    </LinkComponent>
  );
}

Overlay.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  LinkComponent: PropTypes.element.isRequired
};
