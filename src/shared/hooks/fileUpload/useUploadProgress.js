import { useState, useEffect } from 'react';

export default function useUploadProgress(props) {
  const { uploader, id } = props;
  const isTotalProgress = Boolean(!id);
  const [state, setState] = useState({ bytesUploaded: null, totalSize: null });
  useEffect(() => {
    if (isTotalProgress) {
      uploader.on('totalProgress', onTotalProgress);
    } else {
      uploader.on('progress', onFileProgress);
    }
    return () => {
      if (isTotalProgress) {
        uploader.off('totalProgress', onTotalProgress);
      } else {
        uploader.off('progress', onFileProgress);
      }
    };
  }, []);

  return [state];

  function onTotalProgress(bytesUploaded, totalSize) {
    setState({ bytesUploaded, totalSize });
  }

  function onFileProgress(fileId, name, bytesUploaded, totalSize) {
    if (fileId === props.id) {
      setState({ bytesUploaded, totalSize });
    }
  }
}
