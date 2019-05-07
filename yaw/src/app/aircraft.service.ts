import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Aircraft } from './aircraft';
import { JSONData } from './JSONData';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AircraftService {
  private _url: string = 'http://localhost:3001/api/';
  constructor(private http: HttpClient) { }

  returnAircraft() {
    return this.http.get<Aircraft[]>(this._url.concat("/now"));
  }
}
