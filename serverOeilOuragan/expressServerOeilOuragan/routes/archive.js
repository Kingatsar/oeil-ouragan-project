const express = require('express');
const Sensor = require('../model/Sensor');
const router = express.Router();

const gen = require('../jsonFormatting/generateJSON');

/* GET archive of weather values. */
router.get('/:period/:feature/:endDatetime?', function (req, res, next) {
    let period = req.params.period;
    let feature = req.params.feature;
    let endDatetime = req.params.endDatetime;

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

        return collection.find({ time: { $gt: beginDate, $lt: endDatetime } }).limit(5).toArray(function (err, result) {
            if (err) {
                throw err;
            }

            return result
        });

    }

    main()
        .then((result) => res.json(storeData(JSON.stringify(result), feature)))
        .catch(console.error)
        .finally(() => client.close())
        .then(console.log("connection done"));


    // .then(result => res.json({ title: "uzftguzegfuyzeg", "mydata": result }))


});

function getPeriod(endDate, strPeriod) {

    let beginDate = new Date(endDate);
    let days;
    if (strPeriod.includes('week')) {
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

function test(data) {
    let dataParse = JSON.parse(data);
    let dataJSON = dataParse[0];
    let dataJSON1 = dataParse[1];
    console.log(dataJSON);
    console.log(dataJSON1);
}

function storeData(data, feature) {
    let result;
    let feature_dim;
    let values = [];
    let times = [];
    let dataParse = JSON.parse(data);
    console.log("----------------- test -------------");

    dataParse.forEach(element => {
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

    console.log(values);
    console.log(times);

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


    result = {
        id: 28,
        name: "Oeil d'Ouragan",
        status: true,
        measurements: {


        }
    };


}




// const { MongoClient } = require('mongodb');
// // or as an es module:
// // import { MongoClient } from 'mongodb'

// // Connection URL
// const url = 'mongodb://localhost:27017';
// const client = new MongoClient(url);

// // Database Name
// const dbName = 'test';

// async function main() {
//     // Use connect method to connect to the server
//     await client.connect();
//     console.log('Connected successfully to server');

//     const db = client.db(dbName);
//     const collection = db.collection('sensor-collection');

//     // Search in collection
//     return collection.find().toArray(function (err, result) {
//         if (err) {
//             throw err;
//         }
//         return result
//         //res.json({title:"Data", "mydata":result})
//     });

// }

// main()
//     .then(result => res.json({ title: "Data", "mydata": result }))
//     .catch(console.error)
//     .finally(() => client.close())
//     .then(console.log("connection done"));

module.exports = router;
