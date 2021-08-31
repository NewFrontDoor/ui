import React from 'react';
import {Except} from 'type-fest';
import ky from 'ky';
import {QueryClient, QueryClientProvider} from 'react-query';
import {act, fireEvent, render, screen} from '@testing-library/react';
import {S3Dropzone, S3DropzoneProps} from '../src/s3-dropzone';

jest.mock('ky', () => {
  const fakeKy: Partial<typeof ky> = {};

  const fakePresignedPost = {
    json: jest.fn().mockResolvedValue({
      url: 'url',
      fields: {
        key: 'abc-123-some-sermon.mp3'
      }
    })
  };

  fakeKy.head = jest.fn().mockResolvedValue({});

  fakeKy.post = jest
    .fn()
    .mockReturnValueOnce(fakePresignedPost)
    .mockReturnValueOnce({});

  return {
    __esModule: true,
    default: fakeKy
  };
});

function setup({
  host,
  uploadUrl,
  title,
  initialFileName,
  onChange
}: Except<S3DropzoneProps, 'children'>) {
  const queryClient = new QueryClient();
  return render(
    <QueryClientProvider client={queryClient}>
      <S3Dropzone
        host={host}
        uploadUrl={uploadUrl}
        title={title}
        initialFileName={initialFileName}
        onChange={onChange}
      >
        <span data-testid="fake-child" />
      </S3Dropzone>
    </QueryClientProvider>
  );
}

test('it renders a dropzone', async () => {
  const host = 'https://sermons.examplechurch.org';
  const uploadUrl = 'https://www.examplechurch.org/api/sermon-upload';
  const onChange = jest.fn();

  setup({
    host,
    uploadUrl,
    onChange
  });

  expect(screen.getByTestId('s3-dropzone')).toHaveTextContent(
    [
      'Upload Audio',
      'Drag ‘n’ drop some files here, or click to select files',
      'Try dropping a file here, or click to select file for upload.'
    ].join('')
  );

  expect(screen.getByTestId('drop-input')).toBeInTheDocument();
});

test('it upload files to S3', async () => {
  const host = 'https://sermons.examplechurch.org';
  const uploadUrl = 'https://www.examplechurch.org/api/sermon-upload';
  const onChange = jest.fn();
  const fileName = 'abc-123-some-sermon.mp3';

  setup({
    host,
    uploadUrl,
    onChange
  });

  const inputElement = screen.getByTestId('drop-input');

  const file = new File(['file'], fileName, {
    type: 'audio/mpeg'
  });

  Object.defineProperty(inputElement, 'files', {
    value: [file]
  });

  act(() => {
    fireEvent.drop(inputElement);
  });

  const fakeChild = await screen.findByTestId('fake-child');

  expect(fakeChild).toHaveAttribute(
    'src',
    'https://sermons.examplechurch.org/abc-123-some-sermon.mp3'
  );

  expect(onChange).toBeCalledWith({
    key: 'abc-123-some-sermon.mp3'
  });
});

test('it renders children with the src of the initial file', async () => {
  const host = 'https://sermons.examplechurch.org';
  const uploadUrl = 'https://www.examplechurch.org/api/sermon-upload';
  const onChange = jest.fn();
  const title = 'Some Sermon';
  const initialFileName = 'abc-123-some-sermon.mp3';

  setup({
    host,
    uploadUrl,
    title,
    initialFileName,
    onChange
  });

  const fakeChild = await screen.findByTestId('fake-child');

  expect(fakeChild).toHaveAttribute(
    'src',
    'https://sermons.examplechurch.org/abc-123-some-sermon.mp3'
  );
});
