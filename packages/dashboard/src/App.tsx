import React from 'react';
import './assets/App.css';
import {useCreateApolloClient} from './hooks/useCreateApolloClient';
import {PublicRoutes} from './routes/PublicRoutes';
import {ApolloProvider} from '@apollo/client';
import {BrowserRouter} from 'react-router-dom';

function App() {
    const client = useCreateApolloClient();

    return (
        <ApolloProvider client={client as any}>
            <BrowserRouter basename="/">
                <PublicRoutes />
            </BrowserRouter>
        </ApolloProvider>
    );
}

export default App;
