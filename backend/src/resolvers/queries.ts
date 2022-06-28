import { All } from "../tsUtils/types";
import { fetchOnRange } from "../requests/get";
import { downwardDays, highestVolume, timeMachine } from "../utils/helpers";
import { parseDate } from "../tsUtils/typeGuards";
import { parseCoingeckoResponse } from "../tsUtils/typeGuards";

const queries = {
    all: async (_root: undefined, args: {startDate: string, endDate: string}): Promise<All> => {
        const startDate = parseDate(args.startDate);
        const endDate = parseDate(args.endDate);
        const data = await fetchOnRange(startDate, endDate);
        const parsedData = parseCoingeckoResponse(data);
        const days = downwardDays(parsedData, startDate, endDate);
        const {date, volume} = highestVolume(parsedData, startDate, endDate);
        const {buy, sell} = timeMachine(parsedData, startDate, endDate);
        const returnThis = {downwardDays: days, highestVolume: {date, volume}, timeMachine: {buy, sell}};
        return returnThis;
    }
};

export default queries;