import React from 'react';
import pick from 'lodash/pick';
import useUpload from 'shared/hooks/fileUpload/useUpload';
import Dropzone from './Dropzone';
import FileItem from './FileItem';
import 'sass/components/fsUpload/index.scss';

function Gallery(props) {
  const { onUploadSuccess } = props;
  const [uploadState, uploadHandlers] = useUpload({
    allowedExtensions: ['png', 'jpg', 'jpeg', 'pdf', 'shp'],
    onFileUploaded,
  });
  const { submittedFiles, uploader } = uploadState;
  return (
    <div className="galleryUpload">
      <Dropzone
        className="fs_dropzone"
        dropActiveClassName="fs_dropzone--active"
        dropAcceptClassname="fs_dropzone--accept"
        dropRejectClassname="fs_dropzone--reject"
        {...pick(uploadHandlers, [
          'onDrop',
          'multiple',
          'children',
          'inputRef',
          'noClick',
        ])}
        label="(Drag and Drop your files here or click here to open file selection dialog)"
      />

      {submittedFiles.length > 0 && (
        <>
          <p className="iField_label">
            On Queue
          </p>
          <div className="fs_uploadItems">
            {submittedFiles.map(e => (
              <FileItem id={e} uploader={uploader} key={e} />
            ))}
          </div>
        </>
      )}
    </div>
  );

  function onFileUploaded(id, filename, response) {
    const { onSetSubmitedFiles } = uploadHandlers;
    onSetSubmitedFiles(prev => prev.filter(e => e !== id));
    onUploadSuccess(response);
  }
}

export default Gallery;
