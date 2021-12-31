import { gql } from "@apollo/client";

// This has graphql fragments.
export const ALL_FRAGMENT = gql`
    fragment AllFragment on Result {
        downwardDays
            timeMachine {
                buy
                sell
            }
            highestVolume {
                date
                volume
        }
    }
`;
