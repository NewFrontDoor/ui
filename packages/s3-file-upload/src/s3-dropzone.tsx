import React, {useState, FC} from 'react';
import PropTypes from 'prop-types';
import ky from 'ky';
import {useQuery, useMutation} from 'react-query';
import {AudioPlayer} from '@newfrontdoor/audio-player';
import {useDropzone} from 'react-dropzone';
import {ScaleLoader} from 'react-spinners';

type PresignedPost = {
  url: string;
  fields: {
    [key: string]: string;
    Policy: string;
    'X-Amz-Signature': string;
  };
};

async function getPresignedPostData(
  uploadUrl: string,
  {name, type}: File
): Promise<PresignedPost> {
  const json = {name, type};
  return ky.post(uploadUrl, {json}).json<PresignedPost>();
}

async function uploadFileToS3(
  presignedPostData: PresignedPost,
  file: File
): Promise<unknown> {
  const formData = new FormData();

  Object.keys(presignedPostData.fields).forEach((key) => {
    formData.append(key, presignedPostData.fields[key]);
  });

  // Actual file has to be appended last.
  formData.append('file', file);

  return ky.post(presignedPostData.url, {body: formData});
}

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

async function checkS3(host: string, fileName: string): Promise<void> {
  return ky.head(fileName, {prefixUrl: host}).then(() => undefined);
}

async function uploadFile({
  uploadUrl,
  file
}: {
  uploadUrl: string;
  file: File;
}): Promise<string> {
  const presignedPostData = await getPresignedPostData(uploadUrl, file);
  await uploadFileToS3(presignedPostData, file);
  return presignedPostData.fields.key;
}

type DropzoneProps = {
  host: string;
  uploadUrl: string;
  title?: string;
  initialFileName?: string;
};

function useS3FileUpload({
  host,
  initialFileName
}: {
  host: string;
  uploadUrl: string;
  initialFileName?: string;
}) {
  /**
   * Stores the file name of the uploaded file
   * Initialise with the current file name, if there is one
   */
  const [fileName, setFile] = useState(initialFileName);

  /**
   * If there is a current file, check if it exists in S3
   */
  const checkS3Status = useQuery([host, fileName], checkS3, {
    enabled: fileName,
    retry: 4,
    retryDelay: 4000,
    refetchOnWindowFocus: false
  });

  /**
   * Start the upload process for a new file
   */
  const [startFileUpload, fileUploadStatus] = useMutation(uploadFile, {
    /**
     * On success, store the file name of the new uploaded file
     */
    onSuccess(data) {
      setFile(data);
    }
  });

  return {
    fileName,
    startFileUpload,
    checkS3Status,
    fileUploadStatus,
    isSuccess: checkS3Status.isSuccess,
    isLoading: checkS3Status.isLoading || fileUploadStatus.isLoading,
    isError: checkS3Status.isError || fileUploadStatus.isError,
    isIdle: checkS3Status.isIdle && fileUploadStatus.isIdle,
    uploadFile
  };
}

export const S3Dropzone: FC<DropzoneProps> = ({
  host,
  title,
  uploadUrl,
  initialFileName
}) => {
  const {
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
      accept: 'audio/*',
      onDrop(acceptedFiles) {
        const [firstFile] = acceptedFiles;
        void startFileUpload({
          uploadUrl,
          file: firstFile
        });
      }
    }
  );

  const fileUrl = fileName ? new URL(fileName, host) : null;

  let styles = {...baseStyle};
  styles = isDragActive ? {...styles, ...activeStyle} : styles;
  styles = isDragReject ? {...styles, ...rejectStyle} : styles;

  return (
    <div>
      <h2>{fileUrl ? title : 'Upload Audio'}</h2>
      {isError && (
        <div>
          <p>
            Audio could not load due to an error. Please contact{' '}
            <a href="mailto:support@newfrontdoor.org">
              support@newfrontdoor.org
            </a>
            .
          </p>
        </div>
      )}
      {isLoading && (
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
      )}
      {isSuccess && fileUrl && (
        <AudioPlayer
          hasPlaybackspeed
          hasBorder
          isInvert={false}
          highlight="#548BF4"
          base="#ddd"
          src={fileUrl.href}
        />
      )}
      {isIdle && (
        <div style={styles} {...getRootProps()}>
          <input {...getInputProps()} />
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
              Try dropping an audio file here, or click to select file for
              upload.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

S3Dropzone.propTypes = {
  host: PropTypes.string.isRequired,
  title: PropTypes.string,
  uploadUrl: PropTypes.string.isRequired,
  initialFileName: PropTypes.string
};
