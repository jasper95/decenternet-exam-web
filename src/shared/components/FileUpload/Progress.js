import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import useUploadProgress from 'shared/hooks/fileUpload/useUploadProgress';

function CircularUploadProgress(props) {
  const {
    id, uploader, className, circleRadius,
  } = props;
  const cname = `${className} ${
    id
      ? 'react-fine-uploader-total-progress-bar'
      : 'react-fine-uploader-file-progress-bar'
  }`;
  const [uploadState] = useUploadProgress({ id, uploader });
  const percentWidth = (uploadState.bytesUploaded / uploadState.totalSize) * 100 || 0;

  const roundCircum = 2 * circleRadius * Math.PI;
  const progessPercent = `${(Math.round(percentWidth) * roundCircum)
    / 100} 999`;

  return (
    <div className={cn(cname)}>
      <div className="progress_icon">
        <svg
          className="progress_iconSvg progress_iconSvg-base"
          viewbox="0 0 100 100"
          width={(circleRadius + 10) * 2}
          height={(circleRadius + 10) * 2}
        >
          <circle
            cx={circleRadius + 10}
            cy={circleRadius + 10}
            r={circleRadius}
          />
        </svg>
        <svg
          className="progress_iconSvg progress_iconSvg-loaded"
          viewbox="0 0 100 100"
          width={(circleRadius + 10) * 2}
          height={(circleRadius + 10) * 2}
          style={{ strokeDasharray: progessPercent }}
        >
          <circle
            cx={circleRadius + 10}
            cy={circleRadius + 10}
            r={circleRadius}
          />
        </svg>
      </div>
    </div>
  );
}

CircularUploadProgress.propTypes = {
  className: PropTypes.string,
  uploader: PropTypes.object.isRequired,
  id: PropTypes.number,
};

CircularUploadProgress.defaultProps = {
  circleRadius: 15,
};

export default CircularUploadProgress;
