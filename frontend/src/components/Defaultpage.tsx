import React, { useState } from "react";
import Form from "./Form";
import Results from "./Results";

const Defaultpage = (): JSX.Element => {
    const [dates, setDates] = useState({startDate: "", endDate: ""});

    return (
        <div>
            <Form setDates={setDates}/>
            <Results dates={dates}/>
        </div>
    );
};

export default Defaultpage;