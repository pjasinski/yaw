import { Component, OnInit, ViewChild } from '@angular/core';
import { Aircraft2Service } from '../aircraft2.service';
import { Aircraft } from '../aircraft';
import { AgmMap } from '@agm/core';
import { appendNgContent } from '@angular/core/src/view/ng_content';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
@ViewChild(AgmMap)

export class MapComponent implements OnInit {
  aircrafts;
  markers: marker[];
  homeLat: number = 39.3996;
  homeLon: number = -76.5239;
  public agmMap: AgmMap;

  constructor(private airService: Aircraft2Service) {}

  displayFlightNumber(event) {
    console.log(event);
  }
  
  getIconURL(h: number) {    
    let direction : number = Math.ceil(h/15)*15; // this spits out the nearest degrees 
    if (direction == 360) {
      direction = 0;
    }
    //console.log(direction);
    let url = 'assets/plane'.concat(direction.toString()).concat('.svg');
    //console.log(url);
    //console.log(h);
    return url;
  }

  ngOnInit() {
    this.airService.returnAircraft().subscribe(data => {
      this.aircrafts = data;
    });    
  }

} 

