import { gql } from "@apollo/client";
import { ALL_FRAGMENT } from "./fragments";
// This has all the queries we execute.
export const ALL = gql`
    query All($startDate: String!, $endDate: String!) {
        all(startDate: $startDate, endDate: $endDate) {
            ...AllFragment
        }
    }
    ${ALL_FRAGMENT}
`;