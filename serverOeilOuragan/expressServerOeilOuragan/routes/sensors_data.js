const express = require('express');
const Sensor = require('../model/Sensor');
const router = express.Router();

/* GET archive of weather values. */
router.get('/archive', function (req, res, next) {

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

        // Search in collection
        return collection.find().toArray(function (err, result) {
            if (err) {
                throw err;
            }
            return result
            //res.json({title:"Data", "mydata":result})
        });

    }

    main()
        .then(result => res.json({ title: "Data", "mydata": result }))
        .catch(console.error)
        .finally(() => client.close())
        .then(console.log("connection done"));

});



module.exports = router;
