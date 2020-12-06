import {useState} from 'react';
import ky from 'ky';
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

export function useS3FileUpload({
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

  const fileUrl = fileName ? new URL(fileName, host) : null;

  return {
    fileUrl,
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
