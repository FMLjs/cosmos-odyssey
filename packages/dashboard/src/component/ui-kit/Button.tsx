import React from "react";

interface Props {
    text: string,
    className: string,
    type: 'button' | 'submit' | 'reset'
    onClick?: () => void,
    disabled?: boolean
};

export const Button: React.FC<Props> = (props) =>  {
    const {
        text,
        className,
        onClick,
        type,
        disabled = false
    } = props;
    
    return (
        <button className={className}
                onClick={onClick}
                type={type} 
                disabled={disabled} >
            {text}
        </button>
    )
}
 