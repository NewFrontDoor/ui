/** @jsx jsx */
import {jsx, css} from 'theme-ui';
import React from 'react';
import PropTypes from 'prop-types';
import ky from 'ky';
import {useQuery} from 'react-query';

async function fetchBible(url, passage) {
  return ky(url, {
    searchParams: {
      passage,
      type: 'json'
    },
    mode: 'cors',
    credentials: 'omit'
  }).json();
}

export const Bible = ({url, passage}) => {
  const {data, status, error} = useQuery([url, passage], fetchBible);

  if (error) {
    return <p>{error}</p>;
  }

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (data.length > 0) {
    return (
      <div sx={{color: 'text'}}>
        {data.map(({bookname, chapter, text, title, verse}) => (
          <React.Fragment key={`${bookname}-${chapter}-${verse}`}>
            {title && (
              <h5
                css={css`
                  display: block;
                `}
              >
                {/* eslint-disable-next-line react/no-danger */}
                <span dangerouslySetInnerHTML={{__html: title}} />
              </h5>
            )}
            <p>
              <sup
                css={css`
                  vertical-align: top;
                `}
              >
                {verse}{' '}
              </sup>
              {/* eslint-disable-next-line react/no-danger */}
              <span dangerouslySetInnerHTML={{__html: text}} />
            </p>
          </React.Fragment>
        ))}
      </div>
    );
  }

  return null;
};

Bible.propTypes = {
  url: PropTypes.string.isRequired,
  passage: PropTypes.string.isRequired
};
