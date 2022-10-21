import React from 'react';

interface Props {
    side: 'left' | 'right' | 'center',
    object: string,
    children?: React.ReactNode
};

export const Card: React.FC<Props> = (props) => {
    const {
        side,
        object,
        children
    } = props;

    return (
        <div className={`card card--${side}`}>
            <img src={`/images/${object.toLowerCase()}.png`} alt=''/>
            {children}
        </div>
    );
}