import { Component } from '@angular/core';
declare var ol: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  latitude: number = 39.3996;
  longitude: number = -76.5239;

  

  ngOnInit() {
    
  }
}