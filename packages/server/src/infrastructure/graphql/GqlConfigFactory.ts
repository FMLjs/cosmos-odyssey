import {ApolloDriver} from '@nestjs/apollo';
import {Injectable} from '@nestjs/common';
import {GqlModuleOptions, GqlOptionsFactory} from '@nestjs/graphql';
import GraphQLUUID from 'graphql-type-uuid';

@Injectable()
export class GqlConfigFactory implements GqlOptionsFactory {

    createGqlOptions(): GqlModuleOptions {
        return {
            typePaths: ['./**/schema.graphql'],
            resolvers: {
                UUID: GraphQLUUID,
            },
        }
    }
}
