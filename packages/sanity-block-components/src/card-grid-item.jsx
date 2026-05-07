/** @jsx jsx */
import styled from '@emotion/styled';
import {Styled, jsx} from 'theme-ui';
import PropTypes from 'prop-types';

const Actions = styled('section')`
  grid-column: 1/1;
  display: flex;
  flex-direction: row;
  text-align: center;
  justify-content: space-evenly;
  width: 50%;
  margin: auto;
  button {
    background: none;
    text-transform: lowercase;
    font-size: 0.8em;
    padding: 10px 15px 10px 15px;
  }
`;

const actLink = props => ({
  textDecoration: 'none',
  padding: '10px 0',
  fontSize: '0.8em',
  textTransform: 'uppercase',
  border: '1px solid',
  borderColor: '#444446',
  borderRadius: '40px',
  color: '#444446',
  width: '7.25rem',
  ':hover': {
    backgroundColor: '#444446',
    color: 'white',
    cursor: 'pointer'
  },
  '@media (min-width: 420px)': {
    gridColumnStart: props.column + 2
  }
});

const Header = styled(Styled.h3)`
  grid-column: 1/1;
  max-width: 100%;
  text-align: center;
  margin: 0.5em;
`;

const isRelative = /^(?!www\.|(?:http|ftp)s?:\/\/|[A-Za-z]:\\|\/\/).*/;

export default function Card({
  title,
  description,
  image,
  link,
  action,
  LinkComponent
}) {
  return isRelative.test(link) ? (
    <div>
      <LinkComponent url={link}>
        <img sx={{gridColumn: '1/1', width: '100%'}} src={image} alt={title} />
        <Header>{title}</Header>
      </LinkComponent>
      {description}
      <Actions>
        <LinkComponent url={link}>
          <span sx={actLink}>{action ? action : 'VIEW PAGE'}</span>
        </LinkComponent>
      </Actions>
    </div>
  ) : (
    <div>
      <Styled.a href={link.url}>
        <img sx={{gridColumn: '1/1', width: '100%'}} src={image} alt={title} />
        <Header>{title}</Header>
        {description}
        <Actions>
          <Styled.a sx={actLink} href={link.url}>
            {action ? action : 'VIEW PAGE'}
          </Styled.a>
        </Actions>
      </Styled.a>
    </div>
  );
}

Card.propTypes = {
  action: PropTypes.string.isRequired,
  description: PropTypes.element.isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired
};
