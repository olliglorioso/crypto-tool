import { DateWithValue } from "../tsUtils/types";

export const datesBetweenDates = (startDate: Date, endDate: Date): Date[] => {
    const dates: Date[] = [];
    const currentDate = new Date(startDate);
    while (currentDate <= endDate) {
        dates.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
};

export const createDates = (startDate: Date, endDate: Date, values: DateWithValue[]): DateWithValue[] => {
    const days = datesBetweenDates(new Date(startDate), new Date(endDate));
    const finalValues: DateWithValue[] = [];
    days.map((day: Date) => {
        const priceExists = values.find((x: DateWithValue) => x.date === day);
        if (priceExists) {
            values.push(priceExists);
        } else {
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
