import React, { useState } from 'react';
import FilesInput from '../components/FilesInput';
import ImagePreview from '../components/ImagePreview';
import ImagesGrid from '../components/ImagesGrid';
import { ImageContainer } from '../core/image/ImageContainer';
import { ImageService } from '../core/image/ImageServiceImpl';

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