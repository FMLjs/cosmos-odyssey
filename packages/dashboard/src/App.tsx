import React from 'react';
import {ApolloProvider} from '@apollo/client';
import './assets/styles/index.scss';
import {Dashboard} from './component/Dashboard';
import {useCreateApolloClient} from './hooks/useCreateApolloClient';

function App() {
    const client = useCreateApolloClient();

    return (
        <ApolloProvider client={client as any}>
            <Dashboard />
        </ApolloProvider>
    );
}

export default App;
