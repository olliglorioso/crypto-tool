import { gql } from "apollo-server-core";

// GraphQL schema.

const typeDefs = gql`
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

export default typeDefs;