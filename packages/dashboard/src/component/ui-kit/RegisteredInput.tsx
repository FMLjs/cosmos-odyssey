import React from "react";
import {useFormContext} from "react-hook-form";
import {Error} from "./Error";

interface Props {
    name: string,
    label: string
};

export const RegisteredInput: React.FC<Props> = (props) =>  {
    const {
        name,
        label
    } = props;
    
    const {
        register,
        formState: {errors},
    } = useFormContext();

    const input = register(name);

    const errorMessage = errors?.[name]?.message as string;
    const hasError = Boolean(errorMessage);
    const id = `${name}-input`;

    return (
        <>
            {hasError && <Error message={errorMessage} />}
            <div className='registered-container'>
                <label htmlFor={id}>{label}:</label>
                <input {...input}/>
            </div>
        </>
    )
}
 