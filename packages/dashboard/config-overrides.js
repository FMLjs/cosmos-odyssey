module.exports = function override(config, env) {
    let loaders = config.module.rules[1].oneOf;

    loaders.splice(loaders.length - 1, 0, {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        use: ['graphql-tag/loader']
    });

    return config;
}