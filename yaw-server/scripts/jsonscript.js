fs = require('fs');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://yaw:yawdb@patolento.com:27017";

var jsonfile = fs.readFileSync('/data/dump1090/aircraft.json');
var jsonobj = JSON.parse(jsonfile);
// take only aircraft with flight numbers and lat+lons and add the data to a new object
// to write out to file
var onlyFlightNumbers = [];
jsonobj.aircraft.forEach(function(element) {

    if ((element.lat && element.lon) || element.flight){
        element.timeSeen = Math.ceil((new Date()).getTime() / (1000*60)) * (1000*60); // round time to the nearest minute
        if (element.flight){
            element.flight = element.flight.trim();
        }
        onlyFlightNumbers.push(element);
    }
});

var dataToWrite = JSON.stringify(onlyFlightNumbers);
console.log(onlyFlightNumbers);
fs.writeFileSync('/data/aircraft/aircraft.json', dataToWrite);

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("aircraft");
    dbo.collection("aircraft").insertMany(onlyFlightNumbers, function(err, res) {
        if (err) throw err;
        console.log("Number of docs inserted: " + res.insertedCount);
        db.close();
    });
});

