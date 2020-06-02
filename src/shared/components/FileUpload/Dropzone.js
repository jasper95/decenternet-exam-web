import React from 'react';
import PropTypes from 'prop-types';
import ReactDropzone from 'react-dropzone';
import { fromEvent } from 'file-selector';
import pick from 'lodash/pick';
import cn from 'classnames';

function Dropzone(props) {
  const {
    className,
    dropActiveClassName,
    dropAcceptClassname,
    dropRejectClassname,
    icon,
    imageSource,
    label,
    inputRef,
    children,
  } = props;

  return (
    <ReactDropzone
      {...pick(props, 'onDrop', 'multiple', 'accepts', 'noClick')}
      getDataTransferItems={evt => fromEvent(evt)}
      ref={inputRef}
    >
      {({
        getRootProps,
        getInputProps,
        isDragActive,
        isDragReject,
        isDragAccept,
      }) => (
        <div
          {...getRootProps()}
          className={cn('file-uploader-dropzone-container', className, {
            [dropActiveClassName]: isDragActive,
            [dropAcceptClassname]: isDragAccept,
            [dropRejectClassname]: isDragReject,
          })}
        >
          <input {...getInputProps()} />
          <div className="fs_dropzone_label">
            {icon && <i className={icon} />}
            {!icon && <img src={imageSource} className="fs_dropzone_icon" />}
            <span className="fs_dropzone_labelText">{label}</span>
          </div>
          {children}
        </div>
      )}
    </ReactDropzone>
  );
}

Dropzone.propTypes = {
  onDrop: PropTypes.func.isRequired,
  multiple: PropTypes.bool,
  className: PropTypes.string,
  dropActiveClassName: PropTypes.string,
  dropAcceptClassname: PropTypes.string,
  dropRejectClassname: PropTypes.string,
  icon: PropTypes.string,
  label: PropTypes.string,
  imageSource: PropTypes.string,
};
Dropzone.defaultProps = {
  label:
    '(Drag and Drop your files here or click here to open file selection dialog)',
  imageSource: '/img/image-placeholder-gray.png',
};

export default Dropzone;
