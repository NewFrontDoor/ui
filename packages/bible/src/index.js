/** @jsx jsx */
import {jsx, css} from '@emotion/core';
import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import Text from 'mineral-ui/Text';
import ky from 'ky';

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

    fetchBible().catch(error => {
      console.log(error);
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
      <blockquote
        css={css`
          margin: 1.5em 10px;
          padding: 0.5em 10px;
          quotes: '“' '”' '‘' '’';

          &::before {
            content: open-quote;
            font-size: 4em;
            line-height: 0.1em;
            margin-right: 0.25em;
            vertical-align: -0.4em;
          }

          & p {
            display: inline;
          }
        `}
      >
        <Text>
          {data.map(({bookname, chapter, text, title, verse}) => (
            <React.Fragment key={`${bookname}-${chapter}-${verse}`}>
              {/* title && (
                <Text
                  appearance="h5"
                  inherit={false}
                  css={css`
                    display: block;
                  `}
                >
                  {title.replace(/<.*>/, '').trim()}
                </Text>
              ) */}
              <Text inherit={false} appearance="prose">
                <Text inherit={false} appearance="mouse">
                  {verse}{' '}
                </Text>
                {text}
              </Text>
            </React.Fragment>
          ))}
        </Text>
        <Text
          appearance="prose"
          align="end"
          as="i"
          css={css`
            margin-top: 1rem;
            display: block;
          `}
        >
          {' '}
          – {passage}
        </Text>
      </blockquote>
    );
  }

  return null;
}

Bible.propTypes = {
  url: PropTypes.string.isRequired,
  passage: PropTypes.string.isRequired
};

export default Bible;
