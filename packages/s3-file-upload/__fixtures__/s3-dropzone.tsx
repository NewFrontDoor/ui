import React from 'react';
import {S3Dropzone} from '../src';

const host = 'https://sermons.crossroadshobart.org';
const uploadUrl = 'http://localhost:3000/api/sermon-upload';

const fixtures = {
  EmptyDropzone: (
    <S3Dropzone host={host} uploadUrl={uploadUrl}>
      <audio controls />
    </S3Dropzone>
  ),
  InitialFile: (
    <S3Dropzone
      host={host}
      uploadUrl={uploadUrl}
      title="Some Title"
      initialFileName="TKOk.b3v1T03IVQi-crossroads-july-22.mp3"
    >
      <audio controls />
    </S3Dropzone>
  )
};

export default fixtures;
