import React, { useState } from "react";
import Form from "./Form";
import Results from "./Results";

// Component is responsible to return the other pages. 
const Defaultpage = (): JSX.Element => {
    // Init a state for the dates. When form is submitted, the dates are set.
    // And when the state of "dates" is changed, the Results-component fetches the data
    // from the backend.
    const [dates, setDates] = useState({startDate: "", endDate: ""});

    return (
        <div>
            <Form setDates={setDates}/>
            <Results dates={dates}/>
        </div>
    );
};

export default Defaultpage;