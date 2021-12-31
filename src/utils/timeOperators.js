"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDates = exports.datesBetweenDates = void 0;
// These functions have something to do with dates and parsing them.
const datesBetweenDates = (startDate, endDate) => {
    // This function returns an array of dates between two dates (midnight), including the start and end date.
    const dates = [];
    const currentDate = new Date(startDate);
    while (currentDate <= endDate) {
        dates.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
};
exports.datesBetweenDates = datesBetweenDates;
const createDates = (startDate, endDate, values) => {
    // This function creates an array of dates and values.
    // It takes every date between the start and end date, and finds the value for that date as close as possible to midnight.
    // Dates between dates first.
    const days = (0, exports.datesBetweenDates)(new Date(startDate), new Date(endDate));
    const finalValues = [];
    // Iterate through the days.
    days.map((day) => {
        // If there is a value for midnight, we take it and push it to the finalValues-array.
        const priceExists = values.find((x) => x.date === day);
        if (priceExists) {
            values.push(priceExists);
        }
        else {
            // If there is no value for midnight, we take the value for that is as close as possible to midnight.
            const closestPrice = values.reduce((prev, curr) => {
                const prevDiff = Math.abs(prev.date.getTime() - day.getTime());
                const currDiff = Math.abs(curr.date.getTime() - day.getTime());
                return prevDiff < currDiff ? prev : curr;
            });
            finalValues.push({ date: closestPrice.date, value: closestPrice.value });
        }
    });
    return finalValues;
};
exports.createDates = createDates;
