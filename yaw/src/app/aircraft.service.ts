import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AircraftService {

  constructor(private http: HttpClient) { }

  returnAircraft() {
    return this.http.get('https://patolento.com/aircraft.json');
  }
}
