"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_core_1 = require("apollo-server-core");
// GraphQL schema.
const typeDefs = (0, apollo_server_core_1.gql) `
    type TimeMachine {
        buy: String!
        sell: String!
    }

    type Volume {
        date: String!,
        volume: String!
    }

    type Result {
        downwardDays: Int!,
        highestVolume: Volume,
        timeMachine: TimeMachine
    }

    type Query {
        all(startDate: String, endDate: String): Result
    }
`;
exports.default = typeDefs;
