import { Dispatch, SetStateAction, FormEvent } from "react";

// This has all the types.
export type SetDates = Dispatch<SetStateAction<{startDate: string, endDate: string}>>

export type FormSubmit = FormEvent<HTMLFormElement>

export interface Dates {startDate: string, endDate: string}

export interface StyleSheet {
    [key: string]: React.CSSProperties;
}