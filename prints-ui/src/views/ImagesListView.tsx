import React, { useState } from 'react';
import FilesInput from '../components/FilesInput';
import ImagePreview from '../components/ImagePreview';

import './imagesListView.css';

export default function ImagesListView() {

  const [ images, setImages ] = useState<File[]>([]);
  const addImages = (selectedFiles: File[]) => setImages([ ...images, ...selectedFiles ]);

  return (
    <>
      <div className="files-input-container">
        <FilesInput onFilesSelect={addImages} />
      </div>
      <div className="images">
        {images.map(imageFile => <ImagePreview imageFile={imageFile} />)}
      </div>
    </>
  );

}