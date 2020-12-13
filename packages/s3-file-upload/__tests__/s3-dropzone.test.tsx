import React from 'react';
import ky from 'ky';
import {act, fireEvent, render, screen} from '@testing-library/react';
import {S3Dropzone} from '../src/s3-dropzone';

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

const FakeChild = (props: unknown) => (
  <span data-testid="fake-child" {...props} />
);

test('it renders a dropzone', async () => {
  const host = 'https://sermons.examplechurch.org';
  const uploadUrl = 'https://www.examplechurch.org/api/sermon-upload';
  const onChange = jest.fn();

  render(
    <S3Dropzone host={host} uploadUrl={uploadUrl} onChange={onChange}>
      <FakeChild />
    </S3Dropzone>
  );

  expect(screen.getByTestId('s3-dropzone')).toHaveTextContent(
    [
      'Upload Audio',
      'Drag ‘n’ drop some files here, or click to select files',
      'Try dropping an audio file here, or click to select file for upload.'
    ].join('')
  );

  expect(screen.getByTestId('drop-input')).toBeInTheDocument();
});

test('it upload files to S3', async () => {
  const host = 'https://sermons.examplechurch.org';
  const uploadUrl = 'https://www.examplechurch.org/api/sermon-upload';
  const onChange = jest.fn();
  const fileName = 'abc-123-some-sermon.mp3';

  render(
    <S3Dropzone host={host} uploadUrl={uploadUrl} onChange={onChange}>
      <FakeChild />
    </S3Dropzone>
  );

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

  render(
    <S3Dropzone
      host={host}
      uploadUrl={uploadUrl}
      title={title}
      initialFileName={initialFileName}
      onChange={onChange}
    >
      <FakeChild />
    </S3Dropzone>
  );

  const fakeChild = await screen.findByTestId('fake-child');

  expect(fakeChild).toHaveAttribute(
    'src',
    'https://sermons.examplechurch.org/abc-123-some-sermon.mp3'
  );
});
