import {useState} from 'react';
import ky from 'ky/umd';
import {useQuery, useMutation} from 'react-query';

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

async function uploadFileWithPresignedPostData(
  presignedPostData: PresignedPost,
  file: File
): Promise<unknown> {
  const formData = new FormData();

  Object.keys(presignedPostData.fields).forEach((key) => {
    formData.append(key, presignedPostData.fields[key]);
  });

  // Actual file has to be appended last.
  formData.append('file', file);

  return ky.post(presignedPostData.url, {timeout: false, body: formData});
}

async function checkS3(host: string, fileName: string): Promise<void> {
  return ky.head(fileName, {prefixUrl: host}).then(() => undefined);
}

type UploadFileOptions = {
  uploadUrl: string;
  file: File;
};

export type UploadFileResult = {
  key: string;
};

async function uploadFileToS3({
  uploadUrl,
  file
}: UploadFileOptions): Promise<UploadFileResult> {
  const presignedPostData = await getPresignedPostData(uploadUrl, file);
  const {key} = presignedPostData.fields;
  await uploadFileWithPresignedPostData(presignedPostData, file);
  return {key};
}

type S3FileUploadOptions = {
  host: string;
  uploadUrl: string;
  initialFileName?: string;
};

export function useS3FileUpload({
  host,
  uploadUrl,
  initialFileName
}: S3FileUploadOptions) {
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
  const [uploadFile, fileUploadStatus] = useMutation(uploadFileToS3, {
    /**
     * On success, store the file name of the new uploaded file
     */
    onSuccess({key}) {
      setFile(key);
    }
  });

  const fileUrl = fileName ? new URL(fileName, host) : null;

  return {
    fileUrl,
    fileName,
    async startFileUpload(file: File) {
      return uploadFile({file, uploadUrl});
    },
    checkS3Status,
    fileUploadStatus,
    isSuccess: checkS3Status.isSuccess,
    isLoading: checkS3Status.isLoading || fileUploadStatus.isLoading,
    isError: checkS3Status.isError || fileUploadStatus.isError,
    isIdle: checkS3Status.isIdle && fileUploadStatus.isIdle
  };
}
