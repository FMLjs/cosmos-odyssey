import {ApolloError} from '@apollo/client';

export const takeGqlErrorMessage = (error: ApolloError | undefined) => {
    if (!(error instanceof Error) || !error.graphQLErrors || !Array.isArray(error.graphQLErrors)) {
        return undefined;
    }

    return error?.graphQLErrors?.[0]?.extensions?.['exception']?.['message'];
};
