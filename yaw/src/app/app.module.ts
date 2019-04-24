import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AircraftComponent } from './aircraft/aircraft.component';
import { AircraftListComponent } from './aircraft-list/aircraft-list.component';
import { HttpClientModule } from "@angular/common/http";
import { AgmCoreModule } from '@agm/core'
import * as dotenv from 'dotenv';

//dotenv.config();

//const mapApiKey : string = process.env.MAPKEY || '';
@NgModule({
  declarations: [
    AppComponent,
    AircraftComponent,
    AircraftListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDjV56cqDGNT4sLtX-Z4A08inmwPJokdyg'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
