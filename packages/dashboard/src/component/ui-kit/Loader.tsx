import React from 'react'
import ClipLoader from "react-spinners/ClipLoader";

interface Props {
    loading: boolean;
};

export const Loader: React.FC<Props> = (props) => {
    const {
        loading,
    } = props;

    return (
        <ClipLoader loading={loading}
                    size={50}
                    color='#0D324D'
                    className='loader' />
    );
}