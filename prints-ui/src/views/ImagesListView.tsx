import React, { useState } from 'react';
import { ImageContainer } from '../core/image/ImageContainer';
import { ImageService } from '../core/image/ImageService';

import FilesInput from '../components/FilesInput';
import ImagePreview from '../components/ImagePreview';
import ImagesGrid from '../components/ImagesGrid';

import './imagesListView.css';

interface ImageListViewProps {
  imageService: ImageService;
}

export default function ImagesListView(props: ImageListViewProps) {

  const { imageService } = props;

  const [ images, setImages ] = useState<ImageContainer[]>([]);
  const addImages = (selectedFiles: File[]) => setImages([
    ...images, 
    ...imageService.loadImages(selectedFiles)
  ]);

  return (
    <>
      <div className="files-input-container">
        <FilesInput onFilesSelect={addImages} />
      </div>
      <ImagesGrid>
        {images.map(image => <ImagePreview key={image.id} image={image} />)}
      </ImagesGrid>
    </>
  );

}