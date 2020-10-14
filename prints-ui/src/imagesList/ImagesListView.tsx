import React, { useState } from 'react';
import { ImageContainer } from '../core/model/ImageContainer';
import { ImageService } from '../core/image/ImageService';

import VirtualScrollChild from '../common/VirtualScrollChild';

import FilesInput from './components/FilesInput';
import ImagePreview from './components/ImagePreview';
import ImagesGrid from './components/ImagesGrid';
import NoImagesPlaceholder from './components/NoImagesPlaceholder';

import './imagesListView.css';

interface ImageListViewProps {
  imageService: ImageService;
}

export default function ImagesListView(props: ImageListViewProps) {

  const { imageService } = props;

  const [ images, setImages ] = useState<ImageContainer[]>([]);
  const addImages = (selectedFiles: File[]) => setImages([
    ...images, 
    ...imageService.getImages(selectedFiles)
  ]);

  const loadThumbnail = (image: ImageContainer) => imageService.loadThumbnail(image);

  return (
    <div className="h-100">
      <div className="files-input-container">
        <FilesInput onFilesSelect={addImages} />
      </div>
      {images.length ?
        <ImagesGrid>
          {images.map(image => 
            <VirtualScrollChild key={image.id} height={300}>
              <ImagePreview 
                image={image} 
                loadThumbnail={() => loadThumbnail(image)} />
            </VirtualScrollChild>
          )}
        </ImagesGrid>
        : <NoImagesPlaceholder />
      }
    </div>
  );

}