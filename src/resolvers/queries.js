"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const get_1 = require("../requests/get");
const helpers_1 = require("../utils/helpers");
const typeGuards_1 = require("../tsUtils/typeGuards");
const typeGuards_2 = require("../tsUtils/typeGuards");
const queries = {
    all: (_root, args) => __awaiter(void 0, void 0, void 0, function* () {
        const startDate = (0, typeGuards_1.parseDate)(args.startDate);
        const endDate = (0, typeGuards_1.parseDate)(args.endDate);
        const data = yield (0, get_1.fetchOnRange)(startDate, endDate);
        const parsedData = (0, typeGuards_2.parseCoingeckoResponse)(data);
        const days = (0, helpers_1.downwardDays)(parsedData, startDate, endDate);
        const { date, volume } = (0, helpers_1.highestVolume)(parsedData, startDate, endDate);
        const { buy, sell } = (0, helpers_1.timeMachine)(parsedData, startDate, endDate);
        const returnThis = { downwardDays: days, highestVolume: { date, volume }, timeMachine: { buy, sell } };
        return returnThis;
    })
};
exports.default = queries;
