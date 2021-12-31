"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const apollo_server_core_1 = require("apollo-server-core");
const index_1 = __importDefault(require("./src/resolvers/index"));
const typeDefs_1 = __importDefault(require("./src/utils/typeDefs"));
const http_1 = require("http");
const app_1 = __importDefault(require("./src/utils/app"));
// Function that starts the server.
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    const httpServer = (0, http_1.createServer)(app_1.default);
    // Create the Apollo server.
    const server = new apollo_server_express_1.ApolloServer({
        typeDefs: typeDefs_1.default,
        resolvers: index_1.default,
        plugins: [(0, apollo_server_core_1.ApolloServerPluginDrainHttpServer)({ httpServer })],
    });
    void (yield server.start());
    server.applyMiddleware({ app: app_1.default });
    yield new Promise(resolve => httpServer.listen({ port: 4000 }, resolve));
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
});
startServer();
