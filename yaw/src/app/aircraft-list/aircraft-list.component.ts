import { Component, OnInit } from '@angular/core';
import { Aircraft2Service } from '../aircraft2.service';
import { Observable} from 'rxjs';

@Component({
  selector: 'app-aircraft-list',
  templateUrl: './aircraft-list.component.html',
  styleUrls: ['./aircraft-list.component.css']
})
export class AircraftListComponent implements OnInit {
  public aircrafts;

  constructor(private airService: Aircraft2Service) { }
  ngOnInit() {
    this.airService.returnAircraft()
       .subscribe(data => {
          this.aircrafts = (data);
          console.log(this.aircrafts);
       });
    console.log(this.aircrafts);
  }

}
