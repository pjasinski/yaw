import { Component, OnInit, Input } from '@angular/core';
import { AircraftService } from '../aircraft.service';
import { Aircraft } from '../aircraft';

@Component({
  selector: 'app-aircraft',
  templateUrl: './aircraft.component.html',
  styleUrls: ['./aircraft.component.css']
})

export class AircraftComponent implements OnInit {
  @Input() aircraft: Aircraft;
  
  constructor(private service: AircraftService) { 
    
  }
 
  ngOnInit() {
  }
  
  hasFlightNumber() {
    if ('flight' in this.aircraft) {
      //console.log("aircraft has flight number");
      return true;
    }
    else {
      //console.log("no flight number found");
      return false;
    }
  }

}
