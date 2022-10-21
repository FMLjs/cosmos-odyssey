import React from "react";

interface Props {
    message: string | undefined,
};

export const Error: React.FC<Props> = (props) =>  {
    const {
        message,
    } = props;

    return (
        <div className="error">{message}</div>
    )
}
 