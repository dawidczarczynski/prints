import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardTitle, Spinner } from 'reactstrap';
import { ImageContainer } from '../core/image/ImageContainer';

import './imagePreview.css';

interface ImagePreviewProps {
  image: ImageContainer
}

export default function ImagePreview(props: ImagePreviewProps) {

  const { image } = props;
  const [ loading, setLoading ] = useState<boolean>();
  const [ imageUrl, setImageUrl ] = useState<string>();

  useEffect(() => {
    setLoading(true);
    image.getUrl()
      .then(setImageUrl)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [ image ]);

  return (
    <Card>
      <CardBody>
        <div className="image-container">
          {loading && <Spinner color="primary" />}
          {imageUrl && <img src={imageUrl} width="300" alt={image.getName()} />} 
        </div>
        <CardTitle>{image.getName()}</CardTitle>
      </CardBody>
    </Card>
  );

}
