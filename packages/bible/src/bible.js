/** @jsx jsx */
import {jsx} from 'theme-ui';
import {css} from '@emotion/core';
import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import ky from 'ky-universal';

function useBible(url, passage) {
  const [data, setData] = useState([]);
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchBible() {
      const result = await ky(url, {
        searchParams: {
          passage,
          type: 'json'
        },
        mode: 'cors',
        credentials: 'omit'
      }).json();

      setData(result);
    }

    fetchBible().catch(error_ => {
      console.log(error_);
      setError(`Failed to load bible ${passage}`);
    });
  }, [passage, url]);

  return [error, data];
}

function Bible({url, passage}) {
  const [error, data] = useBible(url, passage);

  if (error) {
    return <p>{error}</p>;
  }

  if (data.length > 0) {
    return (
      <p sx={{color: 'text'}}>
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
      </p>
    );
  }

  return null;
}

Bible.propTypes = {
  url: PropTypes.string.isRequired,
  passage: PropTypes.string.isRequired
};

export default Bible;
