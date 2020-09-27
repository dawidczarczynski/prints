import React, { useState } from 'react';
import FilesInput from '../components/FilesInput';
import ImagePreview from '../components/ImagePreview';
import ImagesGrid from '../components/ImagesGrid';

import './imagesListView.css';

export default function ImagesListView() {

  const [ images, setImages ] = useState<File[]>([]);
  const addImages = (selectedFiles: File[]) => setImages([ ...images, ...selectedFiles ]);

  return (
    <>
      <div className="files-input-container">
        <FilesInput onFilesSelect={addImages} />
      </div>
      <ImagesGrid>
        {images.map(imageFile => <ImagePreview imageFile={imageFile} />)}
      </ImagesGrid>
    </>
  );

}