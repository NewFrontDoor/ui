import React from 'react';
import {S3Dropzone} from '../src';

const host = 'https://resources.churchandnation.org';
const uploadUrl = 'https://new.churchandnation.org/api/sermon-upload';

const fixtures = {
  EmptyDropzone: (
    <S3Dropzone
      host={host}
      uploadUrl={uploadUrl}
      onChange={(fileName) => console.log(fileName)}
      customElementTitle="File Upload"
      errorJSX={<p>
        File could not load due to an error. Please contact{' '}
        <a href="mailto:support@newfrontdoor.org">
          support@newfrontdoor.org
        </a>
        .
      </p>}
      loadingJSX={<p>Custom Loading...</p>}
      acceptFileTypes="application/pdf, video/mp4, audio/*"
    >
      <p>File Uploaded.</p>
    </S3Dropzone>
  ),
  InitialFile: (
    <S3Dropzone
      host={host}
      uploadUrl={uploadUrl}
      title="1 Minute of Silence"
      initialFileName="9Tv3svhO5_4ceerG-silence.mp3"
      onChange={(fileName) => console.log(fileName)}
      customElementTitle="Custom Title"
      errorJSX={<p>Custom Error</p>}
      loadingJSX={<p>Custom Loading...</p>}
      acceptFileTypes="application/pdf, video/mp4, audio/*"
    >
      <p>File Uploaded: {}</p>
    </S3Dropzone>
  )
};

export default fixtures;
