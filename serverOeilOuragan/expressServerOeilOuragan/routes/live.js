
const gen = require('../jsonFormatting/generateJSON');
const express = require('express');
const Sensor = require('../model/Sensor');
const router = express.Router();

/* GET last values of measurements. */
router.get('/:feature?', function (req, res, next) {
    const dateNow = new Date();
    const dateHourBefore = new Date();
    dateHourBefore.setHours(dateHourBefore.getHours() - 1);


    let feat = req.params.feature;

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
        const collection_rain = db.collection('rainCounter-collection');

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

        let myCollecRain = collection_rain.find({ time: { $gt: dateHourBefore, $lt: dateNow } }).toArray(function (err, result) {
            if (err) {
                throw err;
            }
            return result;
        });


        return Promise.all([myCollec, myCollecLoc, myCollecRain]);
    }

    //generateJSONFeature(data, feature)

    if (feat != undefined) {
        main()
            .then((result) => res.json(gen.generateJSONFeature(JSON.stringify(result), feat)))
            .catch(console.error)
            .finally(() => client.close())
            .then(console.log("connection done"));

    } else {
        main()
            .then((result) => res.json(gen.generateJSONLive(JSON.stringify(result))))
            .catch(console.error)
            .finally(() => client.close())
            .then(console.log("connection done"));
    }


});

module.exports = router;
