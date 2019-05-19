import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Aircraft } from './aircraft';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class Aircraft2Service {
  private socket = io('http://localhost:4001');
  constructor() { }

  returnAircraft() {
  const observable = new Observable(observer => {
      this.socket.on('FromAPI', (data) => {
        observer.next(data);
      });
    });
  return observable;
  }
}
