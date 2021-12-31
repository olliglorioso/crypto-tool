import { StyleSheet } from "../tsutils/types";

const styles: StyleSheet = {
    viewport: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    container: {
        display: "grid",
        flexDirection: "column",
        textAlign: "center",
        gap: 8,
        width: "50vw",
    },
    input: {
        padding: "15px",
        borderRadius: 15,
        border: 0,
        boxShadow:" 4px 4px 10px rgba(0,0,0,0.06)",
        textAlign: "center",
    },
    button: {
        appearance: "none",
        padding: 10,
        border: "none",
        color: "#fff",
        fontWeight: 600,
        borderRadius: 5,
        paddingTop: 10
    },
    label: {
        fontSize: "1.2rem",
        fontWeight: 600,
        fontFamily: "Arial",
    },
    error: {
        color: "red",
    }
};

export default styles;