import { DateWithValue } from "../tsUtils/types";

// These functions have something to do with dates and parsing them.
export const datesBetweenDates = (startDate: Date, endDate: Date): Date[] => {
    // This function returns an array of dates between two dates (midnight), including the start and end date.
    const dates: Date[] = [];
    const currentDate = new Date(startDate);
    while (currentDate <= endDate) {
        dates.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
};

export const createDates = (startDate: Date, endDate: Date, values: DateWithValue[]): DateWithValue[] => {
    // This function creates an array of dates and values.
    // It takes every date between the start and end date, and finds the value for that date as close as possible to midnight.
    // Dates between dates first.
    const days = datesBetweenDates(new Date(startDate), new Date(endDate));
    const finalValues: DateWithValue[] = [];
    // Iterate through the days.
    days.map((day: Date) => {
        // If there is a value for midnight, we take it and push it to the finalValues-array.
        const priceExists = values.find((x: DateWithValue) => x.date === day);
        if (priceExists) {
            values.push(priceExists);
        } else {
            // If there is no value for midnight, we take the value for that is as close as possible to midnight.
            const closestPrice = values.reduce((prev: DateWithValue, curr: DateWithValue) => {
                const prevDiff = Math.abs(prev.date.getTime() - day.getTime());
                const currDiff = Math.abs(curr.date.getTime() - day.getTime());
                return prevDiff < currDiff ? prev : curr;
            });
            finalValues.push({date: closestPrice.date, value: closestPrice.value});
        }
    });
    return finalValues;
};
