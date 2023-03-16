// Imports
const express = require('express');
const archiveGen = require('../jsonFormatting/archiveJSON');
const router = express.Router();

/* GET archive of weather values. */
router.get('/:period/:feature', function (req, res, next) {
    // Route variables
    let period = req.params.period;
    let feature = req.params.feature;
    let endDatetime = req.query.endDateTime;

    if (!endDatetime) {
        // If no date mentionned, take current date
        endDatetime = new Date().toISOString();
    }
    const beginDate = archiveGen.getPeriod(endDatetime, period);

    const { MongoClient, ConnectionCheckOutFailedEvent } = require('mongodb');

    // Connection URL
    const url = 'mongodb://localhost:27017';
    const client = new MongoClient(url);

    // Database Name
    const dbName = 'test';

    async function main() {
        // Use connect method to connect to the server
        await client.connect();
        console.log('Connected successfully to server');

        // database name
        const db = client.db(dbName);

        // Collection names
        const collection = db.collection('sensor-collection');
        const collection_loc = db.collection('gpsNmea-collection');
        const collection_rain = db.collection('rainCounter-collection');

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

        let myCollecRain = collection_rain.find({ time: { $gt: beginDate, $lt: endDatetime } }).toArray(function (err, result) {
            if (err) {
                throw err;
            }
            return result;
        });

        return Promise.all([myCollec, myCollecLoc, myCollecRain]);
    }

    main()
        .then((result) => res.json(archiveGen.generateJSONArchive(JSON.stringify(result), feature, period)))
        .catch(console.error)
        .finally(() => client.close())
        .then(console.log("connection done"));

});

module.exports = router;
