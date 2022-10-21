import React from "react";
import {useFormContext} from "react-hook-form";
import {Error} from "./Error";

interface Option {
    label: string
    value: string
}

interface Props {
    name: string,
    options: Option[],
    label: string
};

export const RegisteredSelect: React.FC<Props> = (props) =>  {
    const {
        name,
        options,
        label
    } = props;
    
    const {
        register,
        formState: {errors},
    } = useFormContext();

    const input = register(name);
    const errorMessage = errors?.[name]?.message as string;
    const hasError = Boolean(errorMessage);
    const id = `${name}-select`;

    return (
        <>
            {hasError && <Error message={errorMessage} />}
            <div className="registered-container">
                <label htmlFor={id}>{label}:</label>
                <select {...input}
                        id={id} >
                    {options.map(({value, label}) => (
                        <option key={value}
                                value={value}>
                            {label}
                        </option>
                    ))}
                </select>
            </div>
        </>
    )
}
 