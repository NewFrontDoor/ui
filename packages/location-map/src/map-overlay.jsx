import React from 'react';
import styled from '@emotion/styled';
import {ReactComponent as ClockIcon} from './clock.svg';
import {ReactComponent as EmailIcon} from './email.svg';
import {ReactComponent as LocIcon} from './location.svg';
import {ReactComponent as PhoneIcon} from './phone.svg';

const Container = styled('div')`
  display: grid;
  grid-gap: 0.5rem;
  @media (min-width: 420px) {
    grid-template-columns: ${(props) => props.columns};
    grid-template-rows: 1fr;
    grid-gap: 20px;
  }
`;

const Action = styled('a')`
  align-items: center;
  justify-content: center;
  text-decoration: none;
  padding: 10px 0;
  font-size: 0.8em;
  text-transform: uppercase;
  border: 1px solid;
  text-align: center;
  border-color: #444446;
  border-radius: 40px;
  grid-column-start: ${(props) => props.column + 1};
  color: #444446;
  :hover {
    background-color: #444446;
    color: white;
    cursor: pointer;
  }
  @media (min-width: 420px) {
    grid-column-start: ${(props) => props.column + 2};
  }
`;

const Direction = styled('a')`
  align-items: center;
  justify-content: center;
  text-decoration: none;
  padding: 10px 0;
  font-size: 0.8em;
  text-transform: uppercase;
  border: 1px solid;
  text-align: center;
  border-color: #444446;
  border-radius: 40px;
  grid-column-start: ${(props) => props.column + 1};
  color: #444446;
  :hover {
    background-color: #444446;
    color: white;
    cursor: pointer;
  }
  @media (min-width: 420px) {
    grid-column-start: ${(props) => props.column + 2};
  }
`;

const HeadingH2 = styled('h2')`
  margin-bottom: 2.1875rem;
  font-size: 2.4em;
  font-weight: 700;
  margin-top: 0;
  line-height: 1.2;
`;

const DetailWrapper = styled('div')`
  svg {
    vertical-align: middle;
    padding-right: 10px;
  }
  padding-bottom: 10px;
`;

const Overlay = styled('div')`
  border: white 1px solid;
  grid-column: 1;
  grid-row: 2;
  background: rgba(256, 256, 256, 1);
  border-radius: 4px;
  margin-left: auto;
  margin-right: auto;
  padding: 1em;
  font-family: rubik, proxima-nova, helvetica neue, arial, sans-serif;
  @media (min-width: 420px) {
    padding: 2em;
    grid-column: 2;
    grid-row: 2;
    z-index: 1;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  }
`;

const types = {
  telephone: <PhoneIcon width="25px" />,
  location: <LocIcon width="25px" />,
  time: <ClockIcon width="25px" />,
  email: <EmailIcon width="25px" />
};

export default function MapOverlay({heading, details, actions, lat, long}) {
  return (
    <Overlay>
      {heading ? <HeadingH2>{heading}</HeadingH2> : ''}
      {details.length > 0
        ? details.map((detail) => {
            return (
              <DetailWrapper key={detail.value}>
                {types[detail.type]}
                {detail.value}
              </DetailWrapper>
            );
          })
        : ''}
      {actions.length > 0 ? (
        <Container columns={`auto repeat(${actions.length}, 7.25rem) auto`}>
          {actions.map((link, index) => {
            if (link.directions) {
              return (
                <Direction
                  key={link.text}
                  column={index}
                  href={`https://www.google.com/maps/dir/?api=1&destination=${lat},${long}`}
                >
                  {link.text}
                </Direction>
              );
            }

            return (
              <Action key={link.text} href={`/${link.slug}`} column={index}>
                {link.text}
              </Action>
            );
          })}
        </Container>
      ) : (
        ''
      )}
    </Overlay>
  );
}
