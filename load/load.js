// https://technoapple.com/blog/post/How-to-Insert-Data-into-MongoDB-with-Node.js-and-Mongoose
// https://www.mongodb.com/developer/languages/javascript/getting-started-with-mongodb-and-mongoose/
// 

import mongoose from 'mongoose';
import Sensor from './model/Sensor.js';
import Tph from './model/Tph.js';
import GpsNmea from './model/GpsNmea.js';
import RainCounter from './model/RainCounter.js';
import nmea from 'node-nmea';
import fs from 'fs';
// import * from 'log-timestamp';

// const mongoose = require('mongoose');
// const Sensor = require('./model/Sensor.js');
// const Tph = require('./model/Tph.js');
// const GpsNmea = require('./model/GpsNmea.js');
// const RainCounter = require('./model/RainCounter.js');
// const nmea = require('node-nmea');
// const fs = require('fs');


// insert new data into mongoDB
const sensors = '/dev/shm/sensors';
const tphLog = '/dev/shm/tph.log';
const rainCounterLog = '/dev/shm/rainCounter.log';
const gpsNmea = '/dev/shm/gpsNmea';

watchMyFile(sensors);
watchMyFile(tphLog);
watchMyFile(gpsNmea);
watchMyFile(rainCounterLog);


// ------------------------- functions -------------------------//
function watchMyFile(filePath) {

    /* Watches a given file if it changed or not */

    let myJSON;

    console.log(`Watching for file changes on ${filePath}`);

    fs.watchFile(filePath, (curr, prev) => {

        console.log(`${filePath} file Changed`);


        console.log("Read file");
        fs.readFile(filePath, 'utf-8', (err, data) => {
            if (err) {
                return console.error(err);
            }
            myJSON = dosomething(data, filePath);



        })

    })


}

async function dosomething(data, filePath) {
    /* Saving in database the data */

    // connect to mongoDB
    mongoose.connect('mongodb://localhost:27017/test');

    let value;
    let dataJSON;
    let myNewData;

    if (filePath.includes("sensors")) {

        dataJSON = changeToJSON(data);
        myNewData = createSensor(dataJSON);

    }
    if (filePath.includes("tph")) {

        dataJSON = changeToJSON(data);
        myNewData = createTph(dataJSON);

    }

    if (filePath.includes("gpsNmea")) {
        myNewData = createGPSNmea(data);
    }

    if (filePath.includes("rainCounter")) {
        myNewData = createRainCounter(data);
    }

    // insert in mongo database
    await myNewData.save();

}

function changeToJSON(data) {
    return JSON.parse(data.toString());
}

function createSensor(dataJson) {
    return new Sensor({
        time: dataJson.date,
        temp: dataJson.measure[0].value,
        pre: dataJson.measure[1].value,
        hum: dataJson.measure[2].value,
        lum: dataJson.measure[3].value,
        wind_dir: dataJson.measure[4].value,
        wind_speed: dataJson.measure[5].value,
        wind_speed_max: dataJson.measure[6].value,
    });
}

function createTph(dataJson) {
    return new Tph({
        time: dataJson.date,
        temp: dataJson.temp,
        hum: dataJson.hygro,
        pre: dataJson.press
    });
}

function createGPSNmea(data) {
    const val = data.toString().split("$");
    const gprmc = '$' + val[2].slice(0, -1);
    const value = nmea.parse(gprmc);

    return new GpsNmea({
        lat: value.loc.geojson.coordinates[0],
        long: value.loc.geojson.coordinates[1]
    });
}

function createRainCounter(data) {
    const val = data.toString();
    return new RainCounter({
        time: val
    });
}

