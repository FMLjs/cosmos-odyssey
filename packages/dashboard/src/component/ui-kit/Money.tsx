import React from "react";
import {roundMoney} from "../../utils/roundMoney";

interface Props {
    value: string | number,
    currency?: string
};

export const Money: React.FC<Props> = (props) =>  {
    const {
        value,
        currency
    } = props;

    return (
        <span>{roundMoney(value)} {currency}</span>
    )
}
