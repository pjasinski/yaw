import { Component, OnInit } from '@angular/core';
import { AircraftService } from '../aircraft.service';
import { Aircraft } from '../aircraft';

@Component({
  selector: 'app-aircraft-list',
  templateUrl: './aircraft-list.component.html',
  styleUrls: ['./aircraft-list.component.css']
})
export class AircraftListComponent implements OnInit {
  aircrafts: Aircraft[];
  
  constructor(private airService: AircraftService) {  

  }
  
  ngOnInit() {
    this.airService.returnAircraft()
       .subscribe(data => {
          this.aircrafts = data.aircraft;
          console.log(this.aircrafts);
       });
    console.log(this.aircrafts);
  }

}
