import { Component, OnInit } from '@angular/core';
import { AircraftService } from '../aircraft.service';
import { Aircraft } from '../aircraft';

@Component({
  selector: 'app-aircraft-list',
  templateUrl: './aircraft-list.component.html',
  styleUrls: ['./aircraft-list.component.css']
})
export class AircraftListComponent implements OnInit {

  constructor(private dump1090: AircraftService) { }
  aircrafts: Aircraft[];
  aircraft: Aircraft[];
  ngOnInit() {
    this.dump1090.returnAircraft().toPromise().then((response) => {
      console.log(response.aircraft);
      this.aircrafts = response.aircraft;
    })
    .catch((error) => {
      console.error(error);
    })
  }

}
