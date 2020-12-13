/** @jsx jsx */
import {jsx, css} from 'theme-ui';
import {FC, Fragment} from 'react';
import PropTypes from 'prop-types';
import ky from 'ky';
import {useQuery} from 'react-query';

type BibleResult = {
  bookname: string;
  chapter: string;
  text: string;
  title: string;
  verse: string;
};

async function fetchBible(url: string, passage: string) {
  return ky(url, {
    searchParams: {
      passage,
      type: 'json'
    },
    mode: 'cors',
    credentials: 'omit'
  }).json<BibleResult[]>();
}

type BibleProps = {
  url: string;
  passage: string;
};

export const Bible: FC<BibleProps> = ({url, passage}) => {
  const {data, isError, isLoading} = useQuery([url, passage], fetchBible);

  if (isError) {
    return <p>Whoops! Could not find passage {passage}...</p>;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div sx={{color: 'text'}}>
      {(data ?? []).map(({bookname, chapter, text, title, verse}) => (
        <Fragment key={`${bookname}-${chapter}-${verse}`}>
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
        </Fragment>
      ))}
    </div>
  );
};

Bible.propTypes = {
  url: PropTypes.string.isRequired,
  passage: PropTypes.string.isRequired
};
