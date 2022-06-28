import React, { useState } from "react";
import { SetDates } from "../tsutils/types";
import styles from "./Form.styles";

const Form = ({setDates}: {setDates: SetDates}): JSX.Element => {
    const [buttonColor, setButtonColor] = useState("#3F51B5");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [errorText, setErrorText] = useState("");

    const handleSubmit = () => {
        setErrorText("");
        if (endDate.length !== 10 || startDate.length !== 10) {
            setErrorText("Please enter valid dates.");
            return;
        } else if (new Date(startDate) < new Date("2013-12-27")) {
            setErrorText("Please give a start date newer than 26.12.2013.");
            return;
        } else if (new Date(endDate) > new Date()) {
            setErrorText("Please give an end date in the past.");
            return;
        } else if (new Date(endDate) < new Date(startDate)) {
            setErrorText("End date must be after start date.");
            return;
        }
        setDates({startDate: startDate, endDate: endDate});
    };
    return (
        <div style={styles.viewport}>
            <div style={styles.container}>
                <label style={styles.label}>Start</label>
                <input style={styles.input} type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)}/>
                <label style={styles.label}>End</label>
                <input style={styles.input} type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)}/>
                {errorText !== "" && <div style={styles.error}>{errorText}</div>}
                <button onMouseLeave={() => setButtonColor("#3F51B5")} onMouseEnter={() => setButtonColor("grey")} style={{...styles.button, backgroundColor: buttonColor}} type="button" onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    );
};

export default Form;