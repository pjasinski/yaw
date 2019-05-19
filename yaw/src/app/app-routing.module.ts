import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MapComponent } from './map/map.component';
import { AircraftListComponent } from './aircraft-list/aircraft-list.component';
//import { DataComponent } from './data/data.component';


const routes: Routes = [

  { path: '', component: MapComponent },
  { path: 'list', component: AircraftListComponent },
  //{ path: 'data', component: DataComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
