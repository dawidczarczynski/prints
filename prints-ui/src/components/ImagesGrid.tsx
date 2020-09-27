import React, { ReactNode, ReactNodeArray, useEffect, useState } from 'react';
import { splitEvery } from 'ramda';

interface ImagesGridProps {
    children: ReactNodeArray
}

const IMAGES_PER_ROW = 2;
const COLUMN_SIZE = 12 / IMAGES_PER_ROW;

export default function ImagesGrid(props: ImagesGridProps) {
    const { children } = props;

    const [ rows, setRows ] = useState<ReactNode[][]>([]);
    
    useEffect(() => {
        const imageRows = splitEvery(IMAGES_PER_ROW, children);
        setRows(imageRows);
    }, [ children ]);

    return (
       <>
        {rows.map(columns => 
            <div className="row mb-4">
                {columns.map(column => 
                    <div className={`col-${COLUMN_SIZE}`}>{column}</div>
                )}
            </div>    
        )}
       </>
    );
}
