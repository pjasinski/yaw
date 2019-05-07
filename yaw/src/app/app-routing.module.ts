import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MapComponent } from './map/map.component';
import { AircraftListComponent } from './aircraft-list/aircraft-list.component';


const routes: Routes = [

  { path: '', component: MapComponent},
  { path: 'list', component: AircraftListComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
