import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardTitle, Spinner } from 'reactstrap';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

import { ImageContainer } from '../core/model/ImageContainer';

import './imagePreview.css';

interface ImagePreviewProps {
  image: ImageContainer;
  loadThumbnail: () => Observable<string>;
}

export default function ImagePreview(props: ImagePreviewProps) {

  const { image, loadThumbnail } = props;
  const [ loading, setLoading ] = useState<boolean>(false);
  const [ imageUrl, setImageUrl ] = useState<string>();

  useEffect(() => {
      setLoading(true);
      loadThumbnail()
        .pipe(first())
        .subscribe(thumbnail => {
          setImageUrl(thumbnail);
          setLoading(false)
        });
  }, [ loadThumbnail ]);

  return (
     <Card>
        <CardBody>
          <div className="image-container">
            {loading && <Spinner color="primary" />}
            {imageUrl && <img src={imageUrl} width="300" alt={image.name} />} 
          </div>
          <CardTitle>{image.name}</CardTitle>
        </CardBody>
      </Card>
  );

}
