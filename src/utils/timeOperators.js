"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDates = exports.datesBetweenDates = void 0;
const datesBetweenDates = (startDate, endDate) => {
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
    const days = (0, exports.datesBetweenDates)(new Date(startDate), new Date(endDate));
    const finalValues = [];
    days.map((day) => {
        const priceExists = values.find((x) => x.date === day);
        if (priceExists) {
            values.push(priceExists);
        }
        else {
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
