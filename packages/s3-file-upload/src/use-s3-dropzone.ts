import {useDropzone, DropzoneState} from 'react-dropzone';
import {useS3FileUpload, UploadFileResult} from './use-s3-file-upload';
export type {UploadFileResult} from './use-s3-file-upload';

export type S3DropzoneOptions = {
  host: string;
  uploadUrl: string;
  title?: string;
  initialFileName?: string;
  errorJSX?: React.ReactElement;
  loadingJSX?: React.ReactElement;
  accept?: string | string[];
  customElementTitle?: string;
  onChange(result?: UploadFileResult): void;
};

export type S3DropzoneState = DropzoneState & {
  fileUrl: URL | null,
  fileName?: string,
  isLoading: boolean,
  isError: boolean,
  isSuccess: boolean,
  isIdle: boolean,
}

export function useS3Dropzone({
  host,
  uploadUrl,
  initialFileName,
  accept,
  onChange
}: S3DropzoneOptions): S3DropzoneState {
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

  const dropzoneState = useDropzone(
    {
      accept,
      onDrop(acceptedFiles) {
        const [firstFile] = acceptedFiles;
        void startFileUpload(firstFile).then((result) => {
          onChange(result);
        });
      }
    }
  );

  return {
    fileUrl,
    fileName,
    isLoading,
    isError,
    isSuccess,
    isIdle,
    ...dropzoneState
  }
}
