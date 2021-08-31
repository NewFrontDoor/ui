/** @jsx jsx */
import {jsx} from 'theme-ui';
import {cloneElement, FC} from 'react';
import PropTypes from 'prop-types';
import {useDropzone} from 'react-dropzone';
import {ScaleLoader} from 'react-spinners';
import {useS3FileUpload, UploadFileResult} from './use-s3-file-upload';

const baseStyle = {
  borderWidth: 2,
  borderColor: '#666',
  borderStyle: 'dashed',
  borderRadius: 5
};
const activeStyle = {
  borderStyle: 'solid',
  borderColor: '#6c6',
  backgroundColor: '#eee'
};
const rejectStyle = {
  borderStyle: 'solid',
  borderColor: '#c66',
  backgroundColor: '#eee'
};

export type S3DropzoneProps = {
  children: React.ReactElement;
  host: string;
  uploadUrl: string;
  title?: string;
  initialFileName?: string;
  errorJSX?: React.ReactElement;
  loadingJSX?: React.ReactElement;
  acceptFileTypes?: string;
  customElementTitle?: string;
  onChange(result?: UploadFileResult): void;
};

export const S3Dropzone: FC<S3DropzoneProps> = ({
  children,
  host,
  title,
  uploadUrl,
  initialFileName,
  errorJSX,
  loadingJSX,
  acceptFileTypes,
  customElementTitle,
  onChange
}) => {
  const {
    fileUrl,
    fileName,
    isLoading,
    isError,
    isSuccess,
    isIdle,
    startFileUpload
  } = useS3FileUpload({
    host,
    uploadUrl,
    initialFileName
  });

  const {getRootProps, getInputProps, isDragActive, isDragReject} = useDropzone(
    {
      accept: acceptFileTypes ? acceptFileTypes : 'audio/*',
      onDrop(acceptedFiles) {
        const [firstFile] = acceptedFiles;
        void startFileUpload(firstFile).then((result) => {
          onChange(result);
        });
      }
    }
  );

  let styles = {...baseStyle};
  styles = isDragActive ? {...styles, ...activeStyle} : styles;
  styles = isDragReject ? {...styles, ...rejectStyle} : styles;

  return (
    <div data-testid="s3-dropzone">
      <h2>{fileUrl ? title : (customElementTitle ? customElementTitle : 'Upload Audio')}</h2>
      {isError && (errorJSX ? errorJSX : (
        <div>
          <p>
            Audio could not load due to an error. Please contact{' '}
            <a href="mailto:support@newfrontdoor.org">
              support@newfrontdoor.org
            </a>
            .
          </p>
        </div>
      ))}
      {isLoading && (loadingJSX ? loadingJSX : (
        <div>
          <ScaleLoader
            height={30}
            width={10}
            radius={2}
            margin="2px"
            color="#36D7B7"
          />
          <p>Loading audio file...</p>
          <p>
            N.b. It&apos;s ok to hit the &lsquo;Publish&rsquo; button below
            while file is loading.
          </p>
        </div>
      ))}
      {isSuccess &&
        fileUrl &&
        cloneElement(children, {
          title,
          src: decodeURI(fileUrl.href)
        })}
      {isIdle && (
        <div style={styles} {...getRootProps()}>
          <input data-testid="drop-input" {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <p>
              Drag &lsquo;n&rsquo; drop some files here, or click to select
              files
            </p>
          )}
          {fileName ? (
            <p>&lsquo;{fileName}&rsquo; is uploading...</p>
          ) : isDragReject ? (
            <p>Unsupported file type...</p>
          ) : (
            <p>
              Try dropping a file here, or click to select file for
              upload.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

S3Dropzone.propTypes = {
  children: PropTypes.element.isRequired,
  host: PropTypes.string.isRequired,
  title: PropTypes.string,
  uploadUrl: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  initialFileName: PropTypes.string
};
