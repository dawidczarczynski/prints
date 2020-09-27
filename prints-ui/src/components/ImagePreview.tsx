import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardTitle, Spinner } from 'reactstrap';
import { loadBlobFromFile } from '../core/fileLoader';

import './imagePreview.css';

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
    <Card>
      <CardBody>
        <div className="image-container">
          {loading && <Spinner color="primary" />}
          {image && <img src={image} width="300" alt="Test" />} 
        </div>
        <CardTitle>{imageFile.name}</CardTitle>
      </CardBody>
    </Card>
  );

}
