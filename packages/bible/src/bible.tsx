/** @jsx jsx */
import {jsx} from 'theme-ui';
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

type BibleProps = {
  url: string;
  passage: string;
};

function useBible(url: string, passage: string) {
  return useQuery([url, passage], async () =>
    ky(url, {
      searchParams: {
        passage,
        type: 'json'
      },
      mode: 'cors',
      credentials: 'omit'
    }).json<BibleResult[]>()
  );
}

export const Bible: FC<BibleProps> = ({url, passage}) => {
  const {data, isError, isLoading} = useBible(url, passage);

  if (isError) {
    return <p>Whoops! Could not find passage {passage}...</p>;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div data-testid="bible-text" sx={{color: 'text'}}>
      {(data ?? []).map(({bookname, chapter, text, title, verse}) => (
        <Fragment key={`${bookname}-${chapter}-${verse}`}>
          {title && (
            <h5
              sx={{
                display: 'block'
              }}
            >
              {/* eslint-disable-next-line react/no-danger */}
              <span dangerouslySetInnerHTML={{__html: title}} />
            </h5>
          )}
          <p>
            <sup
              sx={{
                verticalAlign: 'top'
              }}
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
