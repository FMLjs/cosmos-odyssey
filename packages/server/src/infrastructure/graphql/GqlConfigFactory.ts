import {Injectable} from '@nestjs/common';
import {GqlModuleOptions, GqlOptionsFactory} from '@nestjs/graphql';

@Injectable()
export class GqlConfigFactory implements GqlOptionsFactory {

    constructor(
    ) { }

    createGqlOptions(): GqlModuleOptions {
        return {
            typePaths: ['./**/schema.graphql'],
        };
    }
}
