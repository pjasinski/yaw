import { Component, OnInit, Input } from '@angular/core';
import { Aircraft } from '../aircraft';
import { AircraftService } from '../aircraft.service';


declare var ol: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit {
  aircrafts: Aircraft[];
  latitude: number = 39.3996;
  longitude: number = -76.5239;

  map: any;
  marker: any;
  vectorSource: any;
  markerVectorLayer: any;
  
  constructor (private airService: AircraftService) { }
  /*  
  right now, i cannot make the data from the observable available to the rest of the component. this makes it difficult to draw the icon that I need on the map 
  in order for the aircraft to be displayed iteratively. i think there are a couple ways to fix this.
  1: learn how to get the data OUT of the subscribe method in a way that I can use it to draw on the map in this component.
  2: draw the map, pass it and an individual aircraft to a "map icon drawer component" using the binding similar to the aircraft-list component. the "map-icon component"
  would be responsible for orienting (using the heading of the aircraft) and drawing a vector image of a plane sent to it. this feels like the most "angular" way to solve this problem.  
  */
  ngOnInit() {
    /*while(!this.aircraft) {
      console.log("still waiting");
    }*/

    this.airService.returnAircraft()
    .subscribe(data => {
        this.aircrafts = data.aircraft;
        this.map = new ol.Map({
          target: 'map',
          layers: [
            new ol.layer.Tile({
              source: new ol.source.OSM()
            })
          ],
          view: new ol.View({
            center: ol.proj.fromLonLat([-76.5239, 39.3996]),
            zoom: 8
          })
        });
    
        this.marker = new ol.Feature( {
            geometry: new ol.geom.Point(
              //ol.proj.fromLonLat([this.aircrafts[6].lon, this.aircrafts[6].lat]) change this based on the data, it would be possible to write a function to search for one thats defined.
              ol.proj.fromLonLat([-76.8027, 39.1732]) // once i figure out how scope works in javascript change this from the default. 
              ),                                                                   
          });

          this.vectorSource = new ol.source.Vector( {
            features: [this.marker]
          });
      
          this.markerVectorLayer = new ol.layer.Vector({ 
            source: this.vectorSource,
          });
          this.map.addLayer(this.markerVectorLayer);
    });
    }  
    
  }
