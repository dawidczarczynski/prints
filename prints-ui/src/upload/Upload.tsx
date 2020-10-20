import React, { useState } from 'react';
import { Button } from 'reactstrap';

import { ImageService } from '../core/image/ImageService';
import { UploadProgressResult } from '../core/upload/impl/UploadProgress';
import UploadProgress from './UploadProgress';
import UploadSuccess from './UploadSuccess';

interface UploadProps {
    imageService: ImageService;
}

export default function Upload(props: UploadProps) {

    const { imageService } = props;
    const [ progress, setProgress ] = useState<UploadProgressResult | null>(null);

    const upload = () => {
        imageService
            .uploadImages()
            .subscribe(handleProgress);
    };

    const handleProgress = (progress: UploadProgressResult) => {
        setProgress(progress);

        if (progress.done) {
            setTimeout(() => setProgress(null), 3000);
        }
    };

    return (
        <>
            {(progress && !progress.done) && <UploadProgress progress={progress} />}
            {(progress && progress.done) && <UploadSuccess />}
            {!progress &&  <Button outline color="primary" onClick={upload}>Upload</Button>}
        </>
    );

}
