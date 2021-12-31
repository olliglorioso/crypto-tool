"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.timeMachine = exports.highestVolume = exports.downwardDays = void 0;
const timeOperators_1 = require("./timeOperators");
// This has three helper functions that calculate the answers for the three tasks.
const downwardDays = (data, startDate, endDate) => {
    // Turn the data into an array of dates and VALUES. This because createDates-function needs an array of dates and VALUES instead of prices.
    const values = data.prices.map(([date, value]) => ({ date: new Date(date), value }));
    // Get the dates between the start and end date. Every date should be as near midnight as possible.
    const finalPrices = (0, timeOperators_1.createDates)(new Date(startDate), new Date(endDate), values);
    // Calculating the max downward days.
    let maxDownwardDays = 0;
    let downwardDays = 0;
    // Iterate through the prices. 
    for (let i = 0; i < finalPrices.length - 1; i++) {
        const day1 = finalPrices[i];
        const day2 = finalPrices[i + 1];
        // If the second day is higher than the first day, add one to the downwardDays-variable.
        if (day1.value > day2.value) {
            downwardDays++;
            // If the downwardDays-variable is higher than the maxDownwardDays-variable, set the maxDownwardDays-variable to the downwardDays-variable.
            if (downwardDays > maxDownwardDays) {
                maxDownwardDays = downwardDays;
            }
        }
        else {
            // Otherwise, reset.
            downwardDays = 0;
        }
    }
    return maxDownwardDays;
};
exports.downwardDays = downwardDays;
const highestVolume = (data, startDate, endDate) => {
    // Turn the data into an array of dates and VALUES. This because createDates-function needs an array of dates and VALUES instead of prices.
    const values = data.total_volumes.map(([date, value]) => ({ date: new Date(date), value }));
    // Get the dates between the start and end date. Every date should be as near midnight as possible.
    const finalVolumes = (0, timeOperators_1.createDates)(new Date(startDate), new Date(endDate), values);
    // Calculate the highest volume and its date.
    let highestVolume = 0;
    let highestVolumeDate = '';
    // Iterate through the volumes.
    for (let i = 0; i < finalVolumes.length; i++) {
        const volume = finalVolumes[i].value;
        // If current volume is higher that the highest volume so far, set the highest volume to the current volume 
        // and the highest volume date to the current date.
        if (volume > highestVolume) {
            highestVolume = volume;
            highestVolumeDate = finalVolumes[i].date.toString();
        }
    }
    return { date: highestVolumeDate, volume: Math.round(highestVolume).toString() };
};
exports.highestVolume = highestVolume;
const timeMachine = (data, startDate, endDate) => {
    // Turn the data into an array of dates and VALUES. This because createDates-function 
    // needs an array of dates and VALUES instead of prices.
    const values = data.prices.map(([date, value]) => ({ date: new Date(date), value }));
    // Get the dates between the start and end date. Every date should be as near midnight as possible.
    const prices = (0, timeOperators_1.createDates)(new Date(startDate), new Date(endDate), values);
    // Calculate days to buy and sell.
    let buy = prices[0];
    let sell = prices[1];
    let maxProfit = 0;
    // Iterate through the prices.
    for (let buyIndex = 0; buyIndex < prices.length; buyIndex++) {
        // Iterate through the prices starting from the next day, because we want to buy the first day.
        for (let sellIndex = buyIndex + 1; sellIndex < prices.length; sellIndex++) {
            // Prices[sellIndex] is the sell price and prices[buyIndex] is the buy price.
            const profit = prices[sellIndex].value - prices[buyIndex].value;
            // If the profit is higher than the maxProfit, set the maxProfit to the profit.
            // If not, we continue the inner loop. This way for every buy-day we go through every sell-day.
            if (profit > maxProfit)
                maxProfit = profit, buy = prices[buyIndex], sell = prices[sellIndex];
        }
    }
    // If there are no good days to buy or sell, we just return empty strings.
    if (sell.value - buy.value < 0)
        return { buy: '', sell: '' };
    return { buy: buy.date.toString(), sell: sell.date.toString() };
};
exports.timeMachine = timeMachine;
