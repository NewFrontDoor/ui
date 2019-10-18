/** @jsx jsx */
import {jsx, css} from '@emotion/core';
import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import Text from 'mineral-ui/Text';
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
    return <Text>{error}</Text>;
  }

  if (data.length > 0) {
    return (
      <Text>
        {data.map(({bookname, chapter, text, title, verse}) => (
          <React.Fragment key={`${bookname}-${chapter}-${verse}`}>
            {title && (
              <Text
                appearance="h5"
                inherit={false}
                css={css`
                  display: block;
                `}
              >
                {/* eslint-disable-next-line react/no-danger */}
                <span dangerouslySetInnerHTML={{__html: title}} />
              </Text>
            )}
            <Text inherit={false} appearance="prose">
              <Text inherit={false} appearance="mouse">
                {verse}{' '}
              </Text>
              {/* eslint-disable-next-line react/no-danger */}
              <span dangerouslySetInnerHTML={{__html: text}} />
            </Text>
          </React.Fragment>
        ))}
      </Text>
    );
  }

  return null;
}

Bible.propTypes = {
  url: PropTypes.string.isRequired,
  passage: PropTypes.string.isRequired
};

export default Bible;
