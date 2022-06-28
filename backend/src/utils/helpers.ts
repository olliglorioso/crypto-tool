import { CoingeckoResponse, HighestVolume, TimeMachine } from "../tsUtils/types";
import { createDates } from "./timeOperators";


export const downwardDays = (data: CoingeckoResponse, startDate: string, endDate: string) => {
    const values = data.prices.map(([date, value]) => ({date: new Date(date), value}));
    const finalPrices = createDates(new Date(startDate), new Date(endDate), values);
    let maxDownwardDays = 0;
    let downwardDays = 0;
    for (let i = 0; i < finalPrices.length - 1; i++) {
        const day1 = finalPrices[i];
        const day2 = finalPrices[i + 1];
        if (day1.value > day2.value) {
            downwardDays++;
            if (downwardDays > maxDownwardDays) {
                maxDownwardDays = downwardDays;
            }
        } else {
            downwardDays = 0;
        }
    }
    return maxDownwardDays;
};

export const highestVolume = (data: CoingeckoResponse, startDate: string, endDate: string): HighestVolume => {
    const values = data.total_volumes.map(([date, value]) => ({date: new Date(date), value}));
    const finalVolumes = createDates(new Date(startDate), new Date(endDate), values);
    let highestVolume = 0;
    let highestVolumeDate = '';
    for (let i = 0; i < finalVolumes.length; i++) {
        const volume = finalVolumes[i].value;
        if (volume > highestVolume) {
            highestVolume = volume;
            highestVolumeDate = finalVolumes[i].date.toString();
        }
    }
    return {date: highestVolumeDate, volume: Math.round(highestVolume).toString()};
};

export const timeMachine = (data: CoingeckoResponse, startDate: string, endDate: string): TimeMachine => {
    const values = data.prices.map(([date, value]) => ({date: new Date(date), value}));
    const prices = createDates(new Date(startDate), new Date(endDate), values);
    let buy = prices[0];
    let sell = prices[1];
    let maxProfit = 0;
    for (let buyIndex = 0; buyIndex < prices.length; buyIndex++) {
        for (let sellIndex = buyIndex + 1; sellIndex < prices.length; sellIndex++) {
            const profit = prices[sellIndex].value - prices[buyIndex].value;
            if (profit > maxProfit) maxProfit = profit, buy = prices[buyIndex], sell = prices[sellIndex];
        }
    }
    if (sell.value - buy.value < 0) return {buy: '', sell: ''};
    return {buy: buy.date.toString(), sell: sell.date.toString()};
};