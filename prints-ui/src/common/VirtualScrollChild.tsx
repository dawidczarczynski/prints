import React, { ReactElement } from 'react';
import { useInView } from 'react-intersection-observer';

interface VirtualScrollChildProps {
    height: number;
    children: ReactElement | ReactElement[];
}

export default function VirtualScrollChild(props: VirtualScrollChildProps) {
    const { height, children } = props;
    const [ ref, inView ] = useInView();

    return (
        <div style={{height: `${height}px`, overflow: 'hidden '}} ref={ref}>
            {inView && children}
        </div>
    )
}