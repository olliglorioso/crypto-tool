import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import resolvers from './src/resolvers/index';
import typeDefs from './src/utils/typeDefs';
import { createServer } from "http";
import app from './src/utils/app';

// Function that starts the server.
const startServer = async () => {

    const httpServer = createServer(app);
    // Create the Apollo server.
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    });

    void await server.start();
    server.applyMiddleware({ app });
    await new Promise<void>(resolve => httpServer.listen({ port: 4000 }, resolve));
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

startServer()