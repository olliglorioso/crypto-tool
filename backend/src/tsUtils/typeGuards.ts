import { UserInputError } from "apollo-server-core";
import { CoingeckoResponse } from "./types";

const isString = (value: unknown): value is string => {
    return typeof value === "string" || value instanceof String;
};

export const parseDate = (date: unknown): string => {
    if (!isString(date)) {
        throw new UserInputError("Date must be a string.");
    }
    if (new Date(date).toString() === "Invalid Date") {
        throw new UserInputError("Date is not a valid.");
    }
    return date;
};

export const parseCoingeckoResponse = (response: unknown): CoingeckoResponse => {
    if (!(response instanceof Object)) {
        throw new UserInputError("Response is not an object.");
    }
    if (!("prices" in response)) {
        throw new UserInputError("Response does not contain prices.");
    }
    if (!("market_caps" in response)) {
        throw new UserInputError("Response does not contain market_caps.");
    }
    if (!("total_volumes" in response)) {
        throw new UserInputError("Response does not contain total_volumes.");
    }
    return response as CoingeckoResponse;
};
