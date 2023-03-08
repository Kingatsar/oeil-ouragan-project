const express = require('express');
const Sensor = require('../model/Sensor');
const router = express.Router();

/* GET last values of measurements. */
router.get('/:feature?', function (req, res, next) {
    let feat = req.params.feature;
    console.log(" ----------- feat -----------");
    console.log(feat != undefined);
    console.log('get value for live');
    const { MongoClient } = require('mongodb');

    // Connection URL
    console.log('Connection URL');
    const url = 'mongodb://localhost:27017';
    const client = new MongoClient(url);

    // Database Name
    console.log('Database Name')
    const dbName = 'test';

    async function main() {
        // Use connect method to connect to the server
        await client.connect();
        console.log('Connected successfully to server');

        const db = client.db(dbName);
        const collection = db.collection('sensor-collection');
        const collection_loc = db.collection('gpsNmea-collection');

        let myCollec = collection.find().sort({ x: -1 }).limit(1).toArray(function (err, result) {
            if (err) {
                throw err;
            }

            return result
        });

        let myCollecLoc = collection_loc.find().sort({ x: -1 }).limit(1).toArray(function (err, result) {
            if (err) {
                throw err;
            }

            return result
        });

        return Promise.all([myCollec, myCollecLoc]);
    }

    //generateJSONFeature(data, feature)

    if (feat != undefined) {
        main()
            .then((result) => res.json(generateJSONFeature(JSON.stringify(result), feat)))
            .catch(console.error)
            .finally(() => client.close())
            .then(console.log("connection done"));

    } else {
        main()
            .then((result) => res.json(generateJSONLive(JSON.stringify(result))))
            .catch(console.error)
            .finally(() => client.close())
            .then(console.log("connection done"));
    }


});




function generateJSONLive(data) {
    /* Generates JSON format for live */
    let result;
    let dataParse = JSON.parse(data);
    let dataJSON = dataParse[0];
    let dataJSONLoc = dataParse[1];

    result = {
        id: 28,
        name: "Oeil d'Ouragan",
        location: {
            lat: dataJSONLoc[0].lat,
            long: dataJSONLoc[0].long
        },
        time: dataJSON.time,
        status: true,
        measurements: {
            lum: {
                name: "Lum",
                value: dataJSON[0].lum,
                unit: "Lux",
                desc: "Luminosity"
            },
            hum: {
                name: "Humidity",
                value: dataJSON[0].hum,
                unit: "%",
                desc: "Humidity"
            },
            temp: {
                name: "Temperature",
                value: dataJSON[0].temp,
                unit: "C",
                desc: "Temperature"
            },
            pre: {
                name: "Pressure",
                value: dataJSON[0].pre,
                unit: "hPa",
                desc: "Atm Pressure"
            },
            rain: {
                name: "Rainfall",
                value: 0,
                unit: "mm/m²/h",
                desc: "Rainfall"
            },
            wind_speed: {
                name: "Wind Speed",
                value: dataJSON[0].wind_speed,
                unit: "Kts",
                desc: "Wind speed in knots"
            },
            wind_dir: {
                name: "Wind Direction",
                value: dataJSON[0].wind_dir,
                unit: "°",
                desc: "Wind direction in °, as in 360°"
            }
        }
    };

    return result;
}

function generateJSONFeature(data, feature) {
    /*  feature String */
    console.log(" ----------- generateJSONFeature ----------- ")
    let result;
    liveJSON = generateJSONLive(data);
    if (feature.includes("lum")) {
        result = {
            id: liveJSON.id,
            name: liveJSON.name,
            location: liveJSON.location,
            time: liveJSON.time,
            status: liveJSON.status,
            measurements: liveJSON.measurements.lum
        }
    } else if (feature.includes("temp")) {
        result = {
            id: liveJSON.id,
            name: liveJSON.name,
            location: liveJSON.location,
            time: liveJSON.time,
            status: liveJSON.status,
            measurements: liveJSON.measurements.temp
        }
    } else if (feature.includes("hum")) {
        result = {
            id: liveJSON.id,
            name: liveJSON.name,
            location: liveJSON.location,
            time: liveJSON.time,
            status: liveJSON.status,
            measurements: liveJSON.measurements.hum
        }
    } else if (feature.includes("pre")) {
        result = {
            id: liveJSON.id,
            name: liveJSON.name,
            location: liveJSON.location,
            time: liveJSON.time,
            status: liveJSON.status,
            measurements: liveJSON.measurements.pre
        }
    } else if (feature.includes("rain")) {
        result = {
            id: liveJSON.id,
            name: liveJSON.name,
            location: liveJSON.location,
            time: liveJSON.time,
            status: liveJSON.status,
            measurements: liveJSON.measurements.rain
        }
    } else if (feature.includes("wind_speed")) {
        result = {
            id: liveJSON.id,
            name: liveJSON.name,
            location: liveJSON.location,
            time: liveJSON.time,
            status: liveJSON.status,
            measurements: liveJSON.measurements.wind_speed
        }
    } else if (feature.includes("wind_dir")) {
        result = {
            id: liveJSON.id,
            name: liveJSON.name,
            location: liveJSON.location,
            time: liveJSON.time,
            status: liveJSON.status,
            measurements: liveJSON.measurements.wind_dir
        }
    } else if (feature.includes("gps")) {
        result = {
            id: liveJSON.id,
            name: liveJSON.name,
            location: liveJSON.location,
            time: liveJSON.time,
            status: liveJSON.status
        }
    }

    return result;

}



module.exports = router;
