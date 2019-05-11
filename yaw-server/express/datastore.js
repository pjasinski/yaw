"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var mongodb_1 = require("mongodb");
var dotenv = require("dotenv");
dotenv.config();
var URL = 'mongodb://yaw:yawdb@patolento.com:27017/aircraft';
var YawDatastore = /** @class */ (function () {
    function YawDatastore(client) {
        this.aircraft = client.db().collection('aircraft');
    }
    YawDatastore.connect = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        return mongodb_1.MongoClient.connect(URL, function (err, client) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                if (err) {
                                    reject(err);
                                }
                                resolve(client);
                                return [2 /*return*/];
                            });
                        }); });
                    })];
            });
        });
    };
    /*
    yaw api data endpoints: https://patolento.com/yaw
    V /?flightnumber - getFlightNumber(fn: string) - returns all aircraft with the flight number specified
    V /now/?flightnumber - getFlightNumberFromNow(fn: string) - returns the flight number if available at current time
    V /now/?lat,long - getFromLatLon(lat: number, lon: number) - returns a flight at a specificed lat lon, or the cloest one
    /now/?squak - getSquak(squak: number) - return based on a specific squak number
    /?squak - getAllSquaks(squack: number) - search the whole database for specific squaks
    */
    YawDatastore.prototype.getNow = function () {
        var now = Math.ceil((new Date()).getTime() / (1000 * 60)) * (1000 * 60);
        return now - (1000 * 60);
    };
    YawDatastore.prototype.getFlightsNow = function () {
        return __awaiter(this, void 0, void 0, function () {
            var now;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        now = this.getNow();
                        console.log(now);
                        return [4 /*yield*/, this.aircraft.find({ timeSeen: now }).toArray()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    YawDatastore.prototype.getFlightNumber = function (fn) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(fn);
                        return [4 /*yield*/, this.aircraft.find({ "flight": fn }).toArray()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    YawDatastore.prototype.getFlightNumberFromNow = function (fn) {
        return __awaiter(this, void 0, void 0, function () {
            var now;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        now = Math.ceil((new Date()).getTime() / (1000 * 60)) * (1000 * 60);
                        return [4 /*yield*/, this.aircraft.findOne({ "flight": fn, timeSeen: now })];
                    case 1: // rounds to nearest minute
                    return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    YawDatastore.prototype.getFromLatLonFromNow = function (lat, lon) {
        return __awaiter(this, void 0, void 0, function () {
            var now;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        now = Math.ceil((new Date()).getTime() / (1000 * 60)) * (1000 * 60);
                        return [4 /*yield*/, this.aircraft.find({ lat: lat, lon: lon, timeSeen: now })];
                    case 1: // rounds to nearest minute
                    return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    YawDatastore.prototype.getFromLatLon = function (lat, lon) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.aircraft.find({ lat: lat, lon: lon }).toArray()];
                    case 1: // there has to be some guidance as to the precsion. 
                    return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    YawDatastore.prototype.getSquawkFromNow = function (squawk) {
        return __awaiter(this, void 0, void 0, function () {
            var now;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        now = Math.ceil((new Date()).getTime() / (1000 * 60)) * (1000 * 60);
                        return [4 /*yield*/, this.aircraft.find({ timeSeen: now, squawk: squawk })];
                    case 1: // rounds to nearest minute
                    return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    YawDatastore.prototype.getSquawk = function (squawk) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.aircraft.find({ "squawk": squawk }).toArray()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    YawDatastore.prototype.getEmergencySquawk = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.aircraft.find({ "squawk": 7700 }).toArray()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return YawDatastore;
}());
exports.YawDatastore = YawDatastore;
