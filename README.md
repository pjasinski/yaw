# Yaw flight tracker
## General
Yaw flight tracker is a flight tracker webapp that I am using to monitor air traffic above my house. It will be hosted on patolento.com/yaw. The system uses [dump1090-mutiability](https://github.com/mutability/dump1090), nodejs, express, and angularjs, to render realtime flight data from an RTL-SDR reciever and an antenna mounted in my attic.
## JSON API
The JSON data used in the app follows this format (from [dump1090](https://github.com/mutability/dump1090/blob/master/README-json.md)):
- hex: the 24-bit ICAO identifier of the aircraft, as 6 hex digits. The identifier may start with '~', this means that the address is a non-ICAO address (e.g. from TIS-B).
- squawk: the 4-digit squawk (octal representation)
- flight: the flight name / callsign
- lat, lon: the aircraft position in decimal degrees
- nucp: the NUCp (navigational uncertainty category) reported for the position
- seen_pos: how long ago (in seconds before "now") the position was last updated
- altitude: the aircraft altitude in feet, or "ground" if it is reporting it is on the ground
- vert_rate: vertical rate in feet/minute
- track: true track over ground in degrees (0-359)
- speed: reported speed in kt. This is usually speed over ground, but might be IAS - you can't tell the difference here, sorry!
- messages: total number of Mode S messages received from this aircraft
- seen: how long ago (in seconds before "now") a message was last received from this aircraft
- rssi: recent average RSSI (signal power), in dbFS; this will always be negative.

As of right now, the API isn't deployed yet, so the endpoints won't be listed here. But development is ongoing and the endpoints can be found in the code. 

The data can be accessed raw live at https://patolento.com/aircraft.json

This is a live view of the Mode S ADSB signals over my house at any given time. 

## Yaw Angular Application
To run, make sure you have the Angular CLI and npm installed on your machine, then run 'npm install' and 'ng serve' until it stops yelling at you. 