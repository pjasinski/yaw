import { MongoClient } from "mongodb";
import { YawDatastore } from "./datastore";
import * as express from 'express';
import * as morgan from 'morgan';
import { Request, Response } from 'express';
import { request } from "https";
import { Aircraft } from "../../yaw/src/app/aircraft"
const bodyParser = require('body-parser');

YawDatastore
  .connect()
  .then((client: MongoClient) => {
    const yaw = new YawDatastore(client);
    startServer(yaw);
  });

function startServer(yaw: YawDatastore) {
  const app = express();

  app.use(morgan('dev'));

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  console.log(yaw.getNow());
  const port = process.env.PORT || 3000;
   /*
  yaw api data endpoints: https://patolento.com/yaw
  V /?flightnumber - getFlightNumber(fn: string) - returns all aircraft with the flight number specified
  V /now/?flightnumber - getFlightNumberFromNow(fn: string) - returns the flight number if available at current time
  V /now/?lat,long - getFromLatLon(lat: number, lon: number) - returns a flight at a specificed lat lon, or the cloest one
  /now/?squak - getSquak(squak: number) - return based on a specific squak number
  /?squak - getAllSquaks(squack: number) - search the whole database for specific squaks
  */

  app.get('/api/now', async (request: Request, response: Response) => {
    const flights = await yaw.getFlightsNow()
    console.log(flights);
    response.json({ flights });
  });

  app.get('/api/fn/:flightnumber', async (request: Request, response: Response) => {
    const fn = request.params.flightnumber;
    const flight = await yaw.getFlightNumber(fn);
    response.json({ flight });
  });

  app.get('/api/now/fn/:flightnumber', async (request: Request, response: Response) => {
    const fn = request.params.flightnumber;
    const flight = await yaw.getFlightNumberFromNow(fn);
    response.json({ flight });
  });

  app.get('/api/now/latlon/:lat-:lon', async (request: Request, response: Response) => {
    const lat = request.params.lat;
    const lon = request.params.lon;
    const flight = await yaw.getFromLatLonFromNow(lat, lon);
    response.json({ flight });
  });

  app.get('/api/emergency', async (request: Request, response: Response) => {
    const flight = await yaw.getEmergencySquawk();
    response.json({ flight });
  });
  app.get('/api/squawk/:squawk', async (request: Request, response: Response) => {
    const squawk : string = request.params.squawk;
    console.log(squawk);
    const flight = await yaw.getSquawk(squawk);
    console.log(flight);
    response.json({ flight });
  });

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}