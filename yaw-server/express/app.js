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
var datastore_1 = require("./datastore");
var express = require("express");
var morgan = require("morgan");
var bodyParser = require('body-parser');
datastore_1.YawDatastore
    .connect()
    .then(function (client) {
    var yaw = new datastore_1.YawDatastore(client);
    startServer(yaw);
});
function startServer(yaw) {
    var _this = this;
    var app = express();
    app.use(morgan('dev'));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    console.log(yaw.getNow());
    var port = process.env.PORT || 3000;
    /*
   yaw api data endpoints: https://patolento.com/yaw
   V /?flightnumber - getFlightNumber(fn: string) - returns all aircraft with the flight number specified
   V /now/?flightnumber - getFlightNumberFromNow(fn: string) - returns the flight number if available at current time
   V /now/?lat,long - getFromLatLon(lat: number, lon: number) - returns a flight at a specificed lat lon, or the cloest one
   /now/?squak - getSquak(squak: number) - return based on a specific squak number
   /?squak - getAllSquaks(squack: number) - search the whole database for specific squaks
   */
    app.get('/api/now', function (request, response) { return __awaiter(_this, void 0, void 0, function () {
        var flights;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, yaw.getFlightsNow()];
                case 1:
                    flights = _a.sent();
                    console.log(flights);
                    response.json({ flights: flights });
                    return [2 /*return*/];
            }
        });
    }); });
    app.get('/api/fn/:flightnumber', function (request, response) { return __awaiter(_this, void 0, void 0, function () {
        var fn, flight;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    fn = request.params.flightnumber;
                    return [4 /*yield*/, yaw.getFlightNumber(fn)];
                case 1:
                    flight = _a.sent();
                    response.json({ flight: flight });
                    return [2 /*return*/];
            }
        });
    }); });
    app.get('/api/now/fn/:flightnumber', function (request, response) { return __awaiter(_this, void 0, void 0, function () {
        var fn, flight;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    fn = request.params.flightnumber;
                    return [4 /*yield*/, yaw.getFlightNumberFromNow(fn)];
                case 1:
                    flight = _a.sent();
                    response.json({ flight: flight });
                    return [2 /*return*/];
            }
        });
    }); });
    app.get('/api/now/latlon/:lat-:lon', function (request, response) { return __awaiter(_this, void 0, void 0, function () {
        var lat, lon, flight;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    lat = request.params.lat;
                    lon = request.params.lon;
                    return [4 /*yield*/, yaw.getFromLatLonFromNow(lat, lon)];
                case 1:
                    flight = _a.sent();
                    response.json({ flight: flight });
                    return [2 /*return*/];
            }
        });
    }); });
    app.get('/api/emergency', function (request, response) { return __awaiter(_this, void 0, void 0, function () {
        var flight;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, yaw.getEmergencySquawk()];
                case 1:
                    flight = _a.sent();
                    response.json({ flight: flight });
                    return [2 /*return*/];
            }
        });
    }); });
    app.get('/api/squawk/:squawk', function (request, response) { return __awaiter(_this, void 0, void 0, function () {
        var squawk, flight;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    squawk = request.params.squawk;
                    console.log(squawk);
                    return [4 /*yield*/, yaw.getSquawk(squawk)];
                case 1:
                    flight = _a.sent();
                    console.log(flight);
                    response.json({ flight: flight });
                    return [2 /*return*/];
            }
        });
    }); });
    app.listen(port, function () {
        console.log("Server is running on port " + port);
    });
}
