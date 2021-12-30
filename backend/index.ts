import { ApolloServer } from 'apollo-server';
import resolvers from './src/resolvers/index';
import typeDefs from './src/utils/typeDefs';

// Create ApolloServer and start it.
const server = new ApolloServer({
    typeDefs,
    resolvers,
});

server.listen()
    .then(({ url }: {url: string}) => {
        console.log(`Server ready at ${url}`);
    })
    .catch((err: Error) => {
        console.log(err);
    });