import https from 'https';
import { UserInputError } from "apollo-server-core";
import { CoingeckoResponse } from "../tsUtils/types";
/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-call */

export const fetchOnRange = (startDate: string, endDate: string): Promise<CoingeckoResponse> => {
    const start = Math.round(new Date(startDate).getTime() / 1000);
    const end = Math.round(new Date(new Date(endDate).getFullYear(), new Date(endDate).getMonth(), new Date(endDate).getDate() + 1).getTime() / 1000);
    const url = `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?vs_currency=eur&from=${start}&to=${end}`;
    return new Promise((resolve) => {
        const req = https.get(url, (res: any) => {
            let body = '';
            res.on('data', (chunk: string) => {
                body += chunk;
            });
                
            res.on('end', () => {
                resolve(JSON.parse(body));
            });
        }).on("error", (err: any) => {
            throw new UserInputError(err.message);
        });
        req.end();
    });

};