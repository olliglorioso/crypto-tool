import { All } from "../tsUtils/types";
import { fetchOnRange } from "../requests/get";
import { downwardDays, highestVolume, timeMachine } from "../utils/helpers";
import { parseDate } from "../tsUtils/typeGuards";
import { parseCoingeckoResponse } from "../tsUtils/typeGuards";

// This file has all queries.
const queries = {
    all: async (_root: undefined, args: {startDate: string, endDate: string}): Promise<All> => {
        const startDate = parseDate(args.startDate);
        const endDate = parseDate(args.endDate);
        // Fetch datas from the API with fetchOnRange-function.
        const data = await fetchOnRange(startDate, endDate);
        const parsedData = parseCoingeckoResponse(data);
        // Get the answers for the tasks with three different functions.
        const days = downwardDays(parsedData, startDate, endDate);
        const {date, volume} = highestVolume(parsedData, startDate, endDate);
        const {buy, sell} = timeMachine(parsedData, startDate, endDate);
        // Store the answers in an object.
        const returnThis = {downwardDays: days, highestVolume: {date, volume}, timeMachine: {buy, sell}};
        return returnThis;
    }
};

export default queries;