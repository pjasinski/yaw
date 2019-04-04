import { Component, OnInit, Input } from '@angular/core';
import { AircraftService } from '../aircraft.service';
import { IAircraft } from '../aircraft';

@Component({
  selector: 'app-aircraft',
  templateUrl: './aircraft.component.html',
  styleUrls: ['./aircraft.component.css']
})

export class AircraftComponent implements OnInit {
  @Input() aircraft: object;
  
  constructor(private service: AircraftService) { 
    
  }

  ngOnInit() {
  }

}
