const express = require('express');
const Sensor = require('../model/Sensor');
const router = express.Router();

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


        return collection.find().sort({ x: -1 }).limit(5).toArray(function (err, result) {
            if (err) {
                throw err;
            }

            return result
        });

    }

    main()
        .then(result => res.json({ title: "Data", "mydata": result }))
        .catch(console.error)
        .finally(() => client.close())
        .then(console.log("connection done"));




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
