import { useLazyQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { ALL } from "../graphql/queries";
import { Dates } from "../tsutils/types";
import styles from "./Results.styles";

// This component is responsible to return the results from the backend.
const Results = ({dates}: {dates: Dates}): JSX.Element => {
    // Initiate the query to get the data from the backend. Do not execute yet.
    const [fetch, resp] = useLazyQuery(ALL);

    useEffect(() => {
        // If dates change when the form is submitted and the dates are valid, useEffect will execute the query to backend
        // and the component will re-render if the returned data has changed.
        if (dates.endDate !== "" && dates.startDate !== "") {
            fetch({
                variables: {
                    startDate: dates.startDate,
                    endDate: dates.endDate
                }
            });
        }
    }, [dates]);
    // Check for errors/loading to alert the user.
    if (resp.loading || !resp.called || !resp.data || resp.error) {
        return (
            <div>
                <div style={styles.box}>
                    <h1>Results</h1>
                    {resp.loading 
                        ? <p>Loading...</p>
                        : resp.error 
                            ? <p>{resp.error.message}</p>
                            : <p>Submit first / no data.</p>
                    }
                </div>
            </div>
        );
    }
    const { downwardDays, highestVolume, timeMachine } = resp.data.all;
    // Return.
    return (
        <div>
            <div style={styles.box}>
                <h1>Results</h1>
                <div>Maximum downward days: {downwardDays}</div>
                <div>Highest volume on {new Date(highestVolume.date).toLocaleDateString()}, {highestVolume.volume}€</div>
                {
                    timeMachine.buy !== "" && timeMachine.sell !== ""
                        ? <div>Best day to buy is {new Date(timeMachine.buy).toLocaleDateString()} and sell is {new Date(timeMachine.sell).toLocaleDateString()} </div>
                        : <div>Do not buy or sell.</div>
                }
                <p></p>
            </div>
        </div>
    );
};

export default Results;