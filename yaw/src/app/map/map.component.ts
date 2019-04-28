import { Component, OnInit, ViewChild } from '@angular/core';
import { AircraftService } from '../aircraft.service';
import { Aircraft } from '../aircraft';
import { AgmMap } from '@agm/core';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
@ViewChild(AgmMap)

export class MapComponent implements OnInit {
  aircrafts: Aircraft[];
  markers: marker[];
  homeLat: number = 39.3996;
  homeLon: number = -76.5239;
  public agmMap: AgmMap;
  previousWindow: any;
  
  constructor(private airService : AircraftService) {}
  displayFlightNumber(event) {
    console.log(event);
  }
  ngOnInit() {
    this.airService.returnAircraft().subscribe(data => {
      this.aircrafts = data;
      //console.log(this.aircrafts);
    });
    
  }

} 

interface marker {
	lat: number;
	lon: number;
}

