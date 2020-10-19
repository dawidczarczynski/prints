import React, { useState } from 'react';
import { Button, Progress } from 'reactstrap';

import { ImageService } from '../core/image/ImageService';
import { UploadProgressResult } from '../core/upload/impl/UploadProgress';

interface UploadProps {
    imageService: ImageService;
}

export default function Upload(props: UploadProps) {

    const { imageService } = props;
    const [ progress, setProgress ] = useState<UploadProgressResult>();

    const upload = () => {
        imageService
            .uploadImages()
            .subscribe(progress => setProgress(progress));
    }

    return (
        <div>
            {progress 
                ? 
                    <div style={{ width: '300px' }}>
                        {progress.currentItemName}
                        <Progress value={progress.currentItemPercentProgress}>{progress.currentItemPercentProgress}%</Progress>
                        <Progress value={progress.totalPercentProgress}>{progress.currentItem}/{progress.totalItems}</Progress>
                    </div>
                : 
                    <Button outline color="primary" onClick={upload}>Upload</Button>}
        </div>
    );
}
