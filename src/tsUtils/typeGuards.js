"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseCoingeckoResponse = exports.parseDate = void 0;
const apollo_server_core_1 = require("apollo-server-core");
const isString = (value) => {
    return typeof value === "string" || value instanceof String;
};
const parseDate = (date) => {
    if (!isString(date)) {
        throw new apollo_server_core_1.UserInputError("Date must be a string.");
    }
    if (new Date(date).toString() === "Invalid Date") {
        throw new apollo_server_core_1.UserInputError("Date is not a valid.");
    }
    return date;
};
exports.parseDate = parseDate;
const parseCoingeckoResponse = (response) => {
    if (!(response instanceof Object)) {
        throw new apollo_server_core_1.UserInputError("Response is not an object.");
    }
    if (!("prices" in response)) {
        throw new apollo_server_core_1.UserInputError("Response does not contain prices.");
    }
    if (!("market_caps" in response)) {
        throw new apollo_server_core_1.UserInputError("Response does not contain market_caps.");
    }
    if (!("total_volumes" in response)) {
        throw new apollo_server_core_1.UserInputError("Response does not contain total_volumes.");
    }
    return response;
};
exports.parseCoingeckoResponse = parseCoingeckoResponse;
