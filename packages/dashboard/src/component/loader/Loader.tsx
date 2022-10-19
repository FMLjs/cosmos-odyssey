import React from 'react'
import PacmanLoader from "react-spinners/PacmanLoader";

interface Props {
    loading: boolean;
};

export const Loader: React.FC<Props> = (props) => {
    const {
        loading,
    } = props;

    return (
        <PacmanLoader loading={loading}
                      size={50}
                      color='#15192D' />
    );
}