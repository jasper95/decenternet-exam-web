import { useEffect, useState, useMemo } from 'react';
import pick from 'lodash/pick';
import intersectionWith from 'lodash/intersectionWith';
import FineUploaderTraditional from 'fine-uploader-wrappers';
import cookie from 'js-cookie';

const uploaderConfigKeys = [
  'allowedExtensions',
  'customHeaders',
  'customParams',
  'uploadEndpoint',
  'deleteEndpoint',
  'autoUpload',
];

export default function useUpload(props) {
  const { allowedExtensions } = props;
  const {
    onSubmitFile: onSubmitProp = () => {},
    onFileUploaded: onFileUploadProp = () => {},
    onAllFilesUploaded: onAllFilesUploadedProp = () => {},
    onStatusChange = () => {},
  } = props;
  const [submittedFiles, setSubmittedFiles] = useState([]);
  const uploader = useMemo(initUploader, []);
  useEffect(() => {
    uploader.on('submitted', onSubmitFile);
    uploader.on('complete', onFileUploadProp);
    uploader.on('allComplete', handleAllFilesUploaded);
    uploader.on('cancel', onCancel);
    uploader.on('statusChange', onStatusChange);
    return () => {
      uploader.off('submitted', onSubmitFile);
      uploader.off('complete', onFileUploadProp);
      uploader.off('allComplete', handleAllFilesUploaded);
      uploader.off('cancel', onCancel);
      uploader.off('statusChange', onStatusChange);
    };
  }, []);

  const state = {
    submittedFiles,
    uploader,
    allowedExtensions,
  };

  const handlers = {
    onDrop,
    triggerUpload: () => uploader.methods.uploadStoredFiles(),
    onSetSubmitedFiles: setSubmittedFiles,
  };

  return [state, handlers];

  function initUploader() {
    return createUploader(pick(props, uploaderConfigKeys));
  }

  function onSubmitFile(id) {
    setSubmittedFiles(prev => [...prev, id]);
    onSubmitProp(id);
  }

  function onCancel(id) {
    setSubmittedFiles(prev => prev.filter(e => e !== id));
    uploader.methods.deleteFile(id);
  }

  function handleAllFilesUploaded() {
    onAllFilesUploadedProp(submittedFiles);
  }

  function onDrop(accepted) {
    const { onDropFiles } = props;

    const exists = intersectionWith(
      accepted.map(e => e.name),
      submittedFiles,
      (a, b) => a === uploader.methods.getName(b),
    );
    const rejected = accepted.filter(
      e => !allowedExtensions.includes(
        uploader.qq.getExtension(e.name).toLowerCase(),
      ),
    );

    if (onDropFiles) {
      const filteredAccepted = onDropFiles({ accepted, exists, rejected });
      if (filteredAccepted && filteredAccepted.length) {
        uploader.methods.addFiles(filteredAccepted);
      }
    } else {
      uploader.methods.addFiles(accepted);
    }
  }
}

export function createUploader(options) {
  const {
    allowedExtensions,
    customHeaders = {},
    customParams = {},
    uploadEndpoint = '/api/file/upload',
    deleteEndpoint = '/api/file',
    autoUpload = true,
    uploader,
  } = options;
  return (
    uploader
    || new FineUploaderTraditional({
      options: {
        autoUpload,
        debug: process.env.NODE_ENV !== 'production',
        request: {
          endpoint: uploadEndpoint,
          method: 'POST',
          filenameParam: 'filename',
          uuidName: 'uuid',
          totalFileSizeName: 'total_file_size',
          inputName: 'file',
          params: customParams,
          customHeaders: {
            ...customHeaders,
            Authorization: `Bearer ${cookie.get('token')}`,
          },
        },
        cors: {
          expected: true,
          sendCredentials: true,
        },
        retry: {
          maxAutoAttempts: Infinity,
        },
        chunking: {
          enabled: true,
          mandatory: true,
          paramNames: {
            chunkSize: 'chunksize',
            partByteOffset: 'partbyteoffset',
            partIndex: 'partindex',
            totalParts: 'totalparts',
          },
        },
        resume: {
          enabled: true,
        },
        deleteFile: {
          enabled: true,
          endpoint: deleteEndpoint,
          customHeaders: {
            ...customHeaders,
            Authorization: `Bearer ${cookie.get('token')}`,
          },
        },
        validation: {
          allowedExtensions,
        },
        maxConnections: 5,
      },
    })
  );
}
