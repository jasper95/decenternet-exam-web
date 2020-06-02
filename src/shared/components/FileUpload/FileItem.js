import React from 'react';
import PauseResumeButton from 'react-fine-uploader/pause-resume-button';

import CancelButton from 'react-fine-uploader/cancel-button';
import PropTypes from 'prop-types';
import Thumbnail from 'react-fine-uploader/thumbnail';
import cn from 'classnames';
import useFileStatus from 'shared/hooks/fileUpload/useFileStatus';
import Progress from './Progress';

function FileItem(props) {
  const { className, id, uploader } = props;
  const [state] = useFileStatus({ id, uploader });
  const { status } = state;
  const statusClass = status.toLowerCase().replace(/ /g, '_');

  return (
    <div
      className={cn('fs_uploadItem', className, {
        [`fs_uploadItem-${statusClass}`]: status,
      })}
    >
      <div className="fs_uploadItem_context">
        <Thumbnail id={id} uploader={uploader} />
        <CancelButton
          id={id}
          uploader={uploader}
          className="fs_uploadItem_cancel"
        >
          <i className="dnaicon dnaicon-close" />
        </CancelButton>
      </div>
      <div className="fs_uploadItem_progresContainer">
        <PauseResumeButton
          id={id}
          className="fs_uploadItem_progressBtn"
          uploader={uploader}
        />
        <Progress
          id={id}
          uploader={uploader}
          className="fs_uploadItem_progress"
        />
      </div>
    </div>
  );
}

FileItem.propTypes = {
  uploader: PropTypes.object,
  id: PropTypes.number,
};

export default FileItem;
