import React from "react";
import {formatDateTime} from "../../utils/formatDateTime";

interface Props {
    isTimeVisible: boolean,
    children?: Date
};

export const FormattedDate: React.FC<Props> = (props) =>  {
    const {
        children,
        isTimeVisible
    } = props;
    
    return (
        <span className="formatted-date">
            {children ? formatDateTime(children, isTimeVisible) : '-'}
        </span>
    )
}
 