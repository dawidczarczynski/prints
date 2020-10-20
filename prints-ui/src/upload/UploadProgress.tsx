import React from 'react';
import { Progress } from 'reactstrap';

import { UploadProgressResult } from '../core/upload/impl/UploadProgress';

interface UploadProgressProps {
    progress: UploadProgressResult;
}

export default function UploadProgress(props: UploadProgressProps) {

    const { progress } = props;
    const { currentItem, currentItemName, currentItemPercentProgress, totalItems, totalPercentProgress } = progress;

    return (
        <div style={{ width: 300 }}>
            <Progress className="mb-1" value={currentItemPercentProgress}>
                {currentItemName} - {currentItemPercentProgress}%
            </Progress>  
            <Progress value={totalPercentProgress}>
                Total {currentItem}/{totalItems}
            </Progress>
        </div>
    );

}
