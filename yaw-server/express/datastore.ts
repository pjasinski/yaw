import { Collection, MongoClient, ObjectId } from 'mongodb';
import * as dotenv from 'dotenv';
dotenv.config();

const URL = 'mongodb://yaw:yawdb@patolento.com:27017/aircraft';

export class YawDatastore {
  aircraft: Collection;

  constructor(client: MongoClient) {
    this.aircraft = client.db().collection('aircraft');
  }
  
  static async connect() {
    return new Promise<MongoClient>((resolve, reject) =>
      MongoClient.connect(URL, async (err: Error, client: MongoClient) => {
        if (err) {
          reject(err);
        }
        resolve(client);
      }));
  }
  /*
  yaw api data endpoints: https://patolento.com/yaw
  V /?flightnumber - getFlightNumber(fn: string) - returns all aircraft with the flight number specified
  V /now/?flightnumber - getFlightNumberFromNow(fn: string) - returns the flight number if available at current time
  V /now/?lat,long - getFromLatLon(lat: number, lon: number) - returns a flight at a specificed lat lon, or the cloest one
  /now/?squak - getSquak(squak: number) - return based on a specific squak number
  /?squak - getAllSquaks(squack: number) - search the whole database for specific squaks
  */
  getNow() {
    let now : number = Math.ceil((new Date()).getTime() / (1000*60)) * (1000*60);
    
    return now - (1000*60);
  }
  async getFlightsNow() {
    let now = this.getNow();
    console.log(now);
    return await this.aircraft.find({ timeSeen: now }).toArray();
  }
  async getFlightNumber(fn: string) {
    console.log(fn);
    return await this.aircraft.find({ "flight": fn }).toArray();
  }

  async getFlightNumberFromNow(fn: string) {
    let now = Math.ceil((new Date()).getTime() / (1000*60)) * (1000*60); // rounds to nearest minute
    return await this.aircraft.findOne({ "flight": fn, timeSeen: now });
  }

  async getFromLatLonFromNow(lat: number, lon: number) { // there has to be some guidance as to the precsion. 
    let now = Math.ceil((new Date()).getTime() / (1000*60)) * (1000*60); // rounds to nearest minute
    return await this.aircraft.find({ lat: lat, lon: lon, timeSeen: now }); 
  }
  async getFromLatLon(lat: number, lon: number) { // there has to be some guidance as to the precsion. 
    return await this.aircraft.find({ lat: lat, lon: lon }).toArray(); 
  }
  async getSquawkFromNow(squawk: number) {
    let now = Math.ceil((new Date()).getTime() / (1000*60)) * (1000*60); // rounds to nearest minute
    return await this.aircraft.find( { timeSeen: now, squawk: squawk} );
  }
  async getSquawk(squawk: string) {
    return await this.aircraft.find({ "squawk": squawk}).toArray();
  }

  async getEmergencySquawk() {
    return await this.aircraft.find( { "squawk": 7700 } ).toArray();
  }
}