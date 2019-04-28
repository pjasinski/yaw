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
  iconUrl: any;
  
  constructor(private airService : AircraftService) {}
  displayFlightNumber(event) {
    console.log(event);
  }

  getIconURL(h: number) {
    let direction = "nw"; // northwest by default
    if (h >= 0 && h < 45) {
      direction = "n";
    }
    if (h >= 45 && h < 90) {
      direction = "ne";
    }
    if (h >=90 && h < 135) {
      direction = "e";
    }
    if (h >=135 && h < 180) {
      direction = "se";
    }
    if (h >=180 && h < 225) {
      direction = "s";
    }
    if (h >= 225 && h < 270) {
      direction = "sw";
    }
    if (h >= 270 && h < 315 ) {
      direction = "w";
    }
    if (h >= 315 && h < 360) {
      direction = "nw";
    }
   
    let url = "https://patolento.com/planeicons/".concat(direction).concat(".png");
    //console.log(url);
    //console.log(h);
    return url;
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

