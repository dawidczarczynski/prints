import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { Card, CardBody, CardTitle, Spinner } from 'reactstrap';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

import { ImageContainer } from '../core/image/ImageContainer';

import './imagePreview.css';

interface ImagePreviewProps {
  image: ImageContainer;
  loadThumbnail: () => Observable<string>
}

export default function ImagePreview(props: ImagePreviewProps) {

  const { image, loadThumbnail } = props;
  const [ loading, setLoading ] = useState<boolean>(false);
  const [ imageUrl, setImageUrl ] = useState<string>();
  const [ ref, inView ] = useInView();

  useEffect(() => {
    if (inView) {
      setLoading(true);
      loadThumbnail()
        .pipe(first())
        .subscribe(thumbnail => {
          setImageUrl(thumbnail);
          setLoading(false)
        });
    }
  }, [ loadThumbnail, inView ]);

  return (
    <div style={{height: '300px', overflow: 'hidden'}} ref={ref}>
      { inView ? <Card>
        <CardBody>
          <div className="image-container">
            {loading && <Spinner color="primary" />}
            {imageUrl && <img src={imageUrl} width="300" alt={image.name} />} 
          </div>
          <CardTitle>{image.name}</CardTitle>
        </CardBody>
      </Card>
      : null }
    </div>
  );

}
