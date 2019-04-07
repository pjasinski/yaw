import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Aircraft } from './aircraft';
import { JSONData } from './JSONData';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AircraftService {
  private _url: string = 'https://patolento.com/aircraft.json';
  constructor(private http: HttpClient) { }

  returnAircraft() {
    return this.http.get<JSONData>(this._url);
  }
}
