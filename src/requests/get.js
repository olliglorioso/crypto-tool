"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchOnRange = void 0;
const https_1 = __importDefault(require("https"));
const apollo_server_core_1 = require("apollo-server-core");
/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-call */
// This file includes all the functions that make API-requests (GET). Only one at the moment.
const fetchOnRange = (startDate, endDate) => {
    // Store the first and last date into a variable to ease the API-request.
    const start = Math.round(new Date(startDate).getTime() / 1000);
    const end = Math.round(new Date(new Date(endDate).getFullYear(), new Date(endDate).getMonth(), new Date(endDate).getDate() + 1).getTime() / 1000);
    // Url for the API-request.
    const url = `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?vs_currency=eur&from=${start}&to=${end}`;
    // Make the API-request and return the response as a promise.
    return new Promise((resolve) => {
        const req = https_1.default.get(url, (res) => {
            let body = '';
            res.on('data', (chunk) => {
                body += chunk;
            });
            res.on('end', () => {
                resolve(JSON.parse(body));
            });
        }).on("error", (err) => {
            throw new apollo_server_core_1.UserInputError(err.message);
        });
        req.end();
    });
};
exports.fetchOnRange = fetchOnRange;
