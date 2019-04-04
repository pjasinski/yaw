import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Aircraft } from './aircraft';
import { JSONData } from './JSONData';
@Injectable({
  providedIn: 'root'
})
export class AircraftService {

  constructor(private http: HttpClient) { }

  returnAircraft() {
    return this.http.get<JSONData>('https://patolento.com/aircraft.json');
  }
}
