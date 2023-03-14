const express = require('express');
const Sensor = require('../model/Sensor');
const router = express.Router();

const gen = require('../jsonFormatting/generateJSON');

// /:endDatetime?
/* GET archive of weather values. */
router.get('/:period/:feature', function (req, res, next) {
    let period = req.params.period;
    let feature = req.params.feature;
    let endDatetime = req.query.endDateTime;

    const beginDate = getPeriod(endDatetime, period);
    console.log('-------------- Date --------------');
    console.log("endDate: " + endDatetime);
    console.log("beginDate: " + beginDate);

    const { MongoClient } = require('mongodb');
    // or as an es module:
    // import { MongoClient } from 'mongodb'

    // Connection URL
    const url = 'mongodb://localhost:27017';
    const client = new MongoClient(url);

    // Database Name
    const dbName = 'test';

    async function main() {
        // Use connect method to connect to the server
        await client.connect();
        console.log('Connected successfully to server');

        const db = client.db(dbName);
        const collection = db.collection('sensor-collection');
        const collection_loc = db.collection('gpsNmea-collection');

        let myCollec = collection.find({ time: { $gt: beginDate, $lt: endDatetime } }).toArray(function (err, result) {
            if (err) {
                throw err;
            }
            return result;
        });

        let myCollecLoc = collection_loc.find().sort({ x: -1 }).limit(1).toArray(function (err, result) {
            if (err) {
                throw err;
            }
            return result
        });

        return Promise.all([myCollec, myCollecLoc]);
    }

    main()
        .then((result) => res.json(storeData(JSON.stringify(result), feature)))
        .catch(console.error)
        .finally(() => client.close())
        .then(console.log("connection done"));

});

function getPeriod(endDate, strPeriod) {

    let beginDate = new Date(endDate);
    let days;
    if (strPeriod.includes('day')) {
        days = 1;
    }
    else if (strPeriod.includes('week')) {
        days = 7;
    }
    else if (strPeriod.includes('month')) {
        days = 30;
    }
    else if (strPeriod.includes('year')) {
        days = 365;
    }

    beginDate.setDate(beginDate.getDate() - days);
    return beginDate.toISOString();
}

function storeData(data, feature) {

    let values = [];
    let times = [];
    let dataParse = JSON.parse(data);
    let dataJSON = dataParse[0];
    let dataJSONLoc = dataParse[1];
    console.log("----------------- testing  fzioeuhf -------------");
    let result = {
        id: 28,
        name: "Oeil d'Ouragan",
        location: {
            lat: dataJSONLoc[0].lat,
            long: dataJSONLoc[0].long
        },
        status: true,
    };

    dataJSON.forEach(element => {
        if (feature.includes("lum")) {
            values.push(element.lum);
        } else if (feature.includes("temp")) {
            values.push(element.temp);
        } else if (feature.includes("hum")) {
            values.push(element.hum);
        } else if (feature.includes("pre")) {
            values.push(element.pre);
        } else if (feature.includes("rain")) {
            values.push(element.rain);
        } else if (feature.includes("wind_speed")) {
            values.push(element.wind_speed);
        } else if (feature.includes("wind_dir")) {
            values.push(element.wind_dir);
        } else if (feature.includes("gps")) {
            values.push(element.gps);
        }
        times.push(element.time);
    });

    if (feature.includes("lum")) {
        result["lum"] = {
            name: "Lum",
            values: values,
            times: times,
            unit: "Lux",
            desc: "Luminosity"
        }
    } else if (feature.includes("temp")) {
        result["temp"] = {
            name: "Temperature",
            values: values,
            times: times,
            unit: "C",
            desc: "Temperature"
        }
    } else if (feature.includes("hum")) {
        result["hum"] = {
            name: "Humidity",
            values: values,
            times: times,
            unit: "%",
            desc: "Humidity"
        }
    } else if (feature.includes("pre")) {
        result["pre"] = {
            name: "Pressure",
            values: values,
            times: times,
            unit: "hPa",
            desc: "Atm Pressure"
        }
    } else if (feature.includes("rain")) {
        result["rain"] = {
            name: "Rainfall",
            values: values,
            times: times,
            unit: "mm/m²/h",
            desc: "Rainfall"
        }
    } else if (feature.includes("wind_speed")) {
        result["wind_speed"] = {
            name: "Wind Speed",
            values: values,
            times: times,
            unit: "Kts",
            desc: "Wind speed in knots"
        }
    } else if (feature.includes("wind_dir")) {
        result["wind_dir"] = {
            name: "Wind Direction",
            values: values,
            times: times,
            unit: "°",
            desc: "Wind direction in °, as in 360°"
        }
    }


    return result;
}



module.exports = router;
