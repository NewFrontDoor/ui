# `@newfrontdoor/s3-file-upload`

## `<S3Dropzone />`

Adds S3 upload functionality to [`react-dropzone`](https://github.com/react-dropzone/react-dropzone)

### Props

#### `host`

URL that the file will be hosted from, typically an S3 bucket, or Cloudfront url

#### `uploadUrl`

URL to [fetch a Presigned Post](https://docs.aws.amazon.com/AmazonS3/latest/dev/PresignedUrlUploadObject.html) from

#### `children`

A single React element. Will be cloned using `React.cloneElement`,
and be rendered with a `src` prop with the url of the uploaded file (`${host}/${fileName}`).

#### `title`

The title of the uploaded file

#### `initialFileName`

The name of the initially uploaded file (`${host}/${initialFileName}`)

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

### Usage

```js
import {useS3FileUpload} from '@newfrontdoor/s3-file-upload';

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
        startFileUpload({
          uploadUrl,
          file: acceptedFiles[0]
        });
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
