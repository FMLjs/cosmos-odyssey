import {InMemoryCache} from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client';
import {HttpLink} from 'apollo-link-http';
import {useState} from 'react';
import {Config} from '../Config';

export function useCreateApolloClient() {
    const [client] = useState(() => new ApolloClient({
        link: new HttpLink({
            uri: Config.dataUri
        }),
        cache: new InMemoryCache({addTypename: false}),
        defaultOptions: {
            watchQuery: {
                fetchPolicy: 'network-only'
            }
        },
    }));

    return client;
}
