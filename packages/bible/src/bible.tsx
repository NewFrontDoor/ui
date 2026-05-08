
import type {FC} from 'react';
import { Fragment} from 'react';
import ky from 'ky';
import {useQuery} from '@tanstack/react-query';

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
  return useQuery({
    queryKey: [url, passage],
    queryFn: async () =>
      ky(url, {
        searchParams: {
          passage,
          type: 'json'
        },
        mode: 'cors',
        credentials: 'omit'
      }).json<BibleResult[]>()
  });
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
              { }
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
            { }
            <span dangerouslySetInnerHTML={{__html: text}} />
          </p>
        </Fragment>
      ))}
    </div>
  );
};

/* Bible.propTypes = {
  url: PropTypes.string.isRequired,
  passage: PropTypes.string.isRequired
}; */
