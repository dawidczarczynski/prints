import React, { useState, useEffect } from 'react';
import { loadBlobFromFile } from '../core/fileLoader';

interface ImagePreviewProps {
  imageFile: File
}

export default function ImagePreview(props: ImagePreviewProps) {

  const { imageFile } = props;
  const [ loading, setLoading ] = useState<boolean>();
  const [ image, setImage ] = useState<string>();

  useEffect(() => {
    setLoading(true);
    loadBlobFromFile(imageFile)
      .then(setImage)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [ imageFile ]);

  return (
    <>
      {loading && <p>Loading...</p>}
      {image && <img src={image} width="300" alt="Test" />}
    </>
  );

}
