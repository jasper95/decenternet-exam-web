import { useState, useEffect } from 'react';

export default function useFileStatus(props) {
  const [status, setStatus] = useState('');
  const { uploader, id: fileId } = props;
  const statusEnum = uploader.qq.status;
  useEffect(() => {
    uploader.on('statusChange', onStatusChanged);
    return () => {
      uploader.off('statusChange', onStatusChanged);
    };
  }, []);
  const handlers = {
    triggerPause: () => uploader.methods.pauseUpload(fileId),
    triggerResume: () => uploader.methods.continueUpload(fileId),
    triggerCancel: () => uploader.methods.cancel(fileId),
  };
  const state = {
    isPausable: status === statusEnum.PAUSED,
    isResumable: status === statusEnum.UPLOADING,
    isCancelable: [
      statusEnum.DELETE_FAILED,
      statusEnum.PAUSED,
      statusEnum.QUEUED,
      statusEnum.UPLOAD_RETRYING,
      statusEnum.SUBMITTED,
      statusEnum.UPLOADING,
      statusEnum.UPLOAD_FAILED,
    ].includes(status),
    status,
  };
  return [state, handlers];

  function onStatusChanged(id, oldStatus, newStatus) {
    if (id === fileId) {
      setStatus(newStatus);
    }
  }
}
