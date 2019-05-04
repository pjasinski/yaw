import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AircraftComponent } from './aircraft/aircraft.component';
import { AircraftListComponent } from './aircraft-list/aircraft-list.component';
import { HttpClientModule } from "@angular/common/http";
import { AgmCoreModule } from '@agm/core'
import * as dotenv from 'dotenv';
import { MapComponent } from './map/map.component';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';
import { Aircraft2Service } from './aircraft2.service';

dotenv.config();

const mapApiKey : string = process.env.MAPKEY || '';
@NgModule({
  declarations: [
    AppComponent,
    AircraftComponent,
    AircraftListComponent,
    MapComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDjV56cqDGNT4sLtX'
    }),
    AgmSnazzyInfoWindowModule
  ],
  providers: [Aircraft2Service],
  bootstrap: [AppComponent]
})
export class AppModule { }
