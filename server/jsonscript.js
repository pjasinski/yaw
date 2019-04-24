fs = require('fs');
var jsonfile = fs.readFileSync('./aircraft.json');
var jsonobj = JSON.parse(jsonfile);
// take only aircraft with flight numbers and lat+lons and add the data to a new object 
// to write out to file
var onlyFlightNumbers = [];
jsonobj.aircraft.forEach(function(element) {
    if (element.lat && element.lon && element.flight){
        element.timeSeen = jsonobj.now;
        onlyFlightNumbers.push(element);
    }
}); 

var dataToWrite = JSON.stringify(onlyFlightNumbers);
console.log(onlyFlightNumbers);
fs.writeFileSync('output.json', dataToWrite);
