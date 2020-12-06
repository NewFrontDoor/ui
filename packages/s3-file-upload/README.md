# `@newfrontdoor/s3-file-upload`

## `<S3Dropzone />`

Adds S3 upload functionality to [`react-dropzone`](https://github.com/react-dropzone/react-dropzone)

### Props

#### `host`

URL the file will be hosted from, typically an S3 bucket, or Cloudfront url

#### `uploadUrl`

URL to [fetch a Presigned Post](https://docs.aws.amazon.com/AmazonS3/latest/dev/PresignedUrlUploadObject.html) from

#### `children`

A single React element. Will be cloned using [`React.cloneElement`](https://reactjs.org/docs/react-api.html#cloneelement),
and be rendered with a `src` prop with the url of the uploaded file (`${host}/${fileName}`).

#### `title`

The title of the uploaded file

#### `initialFileName`

The name of the already uploaded file (`${host}/${initialFileName}`)

### Usage

```js
import {S3Dropzone} from '@newfrontdoor/s3-file-upload';
import {AudioPlayer} from '@newfrontdoor/audio-player';

<S3Dropzone host={host} uploadUrl={uploadUrl}>
  <AudioPlayer />
</S3Dropzone>
```

## `useS3FileUpload()`

### Props

#### `host`

URL the file will be hosted from, typically an S3 bucket, or Cloudfront url

#### `initialFileName`

The name of the already uploaded file (`${host}/${initialFileName}`)

### Returns

#### `fileUrl`

The URL of the uploaded file `${host}/${fileName}`

#### `fileName`

The name of the uploaded file

#### `startFileUpload(file)`

Start uploading the file

#### `checkS3Status`

Status result of the `checkS3` query

#### `fileUploadStatus`

Status result of the `fileUpload` mutation

#### `isSuccess`

Success status of the `checkS3` query

```js
checkS3Status.isSuccess
```

#### `isLoading`

Loading status of the `checkS3` query, or the `fileUpload` mutation

```js
checkS3Status.isLoading || fileUploadStatus.isLoading,
```

#### `isError`

Error status of the `checkS3` query, or the `fileUpload` mutation

```js
checkS3Status.isError || fileUploadStatus.isError,
```

#### `isIdle`

Idle status of the `checkS3` query, and the `fileUpload` mutation

```js
checkS3Status.isIdle && fileUploadStatus.isIdle
```

### Usage

```js
import {useS3FileUpload} from '@newfrontdoor/s3-file-upload';
import {useDropzone} from 'react-dropzone';

function FileUpload({
  host,
  uploadUrl,
}) {
  const {
    startFileUpload
  } = useS3FileUpload({
    host,
    uploadUrl
  });

  const {getRootProps, getInputProps} = useDropzone(
    {
      onDrop(acceptedFiles) {
        startFileUpload(acceptedFiles[0]);
      }
    }
  );
  
  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
    </div>
  )
}
```
