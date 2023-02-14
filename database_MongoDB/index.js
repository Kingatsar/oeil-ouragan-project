// https://technoapple.com/blog/post/How-to-Insert-Data-into-MongoDB-with-Node.js-and-Mongoose
// https://www.mongodb.com/developer/languages/javascript/getting-started-with-mongodb-and-mongoose/
// 

import mongoose from 'mongoose';
import Sensor from './model/Sensor.js';
import Tph from './model/Tph.js';
import GpsNmea from './model/GpsNmea.js';
import nmea from 'node-nmea';
import fs from 'fs';
// import * from 'log-timestamp';

// insert new data into mongoDB
// const sensors = '/dev/shm/sensors';
// const tphLog = '/dev/shm/tph.log';
// const rainCounterLog = '/dev/shm/rainCounter.log';;
const gpsNmea = '/dev/shm/gpsNmea';

// watchMyFile(sensors);
// watchMyFile(tphLog);
watchMyFile(gpsNmea);


// ------------------------- functions -------------------------//
function watchMyFile(filePath) {

    /* Watches a given file if it changed or not */

    let myJSON;

    console.log(`Watching for file changes on ${filePath}`);

    fs.watchFile(filePath, (curr, prev) => {

        // if (curr.size.valueOf() === prev.size.valueOf()) {
        //     return;
        // }

        console.log(`${filePath} file Changed`);


        console.log("Read file");
        fs.readFile(filePath, 'utf-8', (err, data) => {
            if (err) {
                return console.error(err);
            }
            myJSON = dosomething(data, filePath);
            // console.log(myJSON.date);



        })

    })


}


// else if (filePath.includes("tph")) {

//     dataJSON = changeToJSON(data);
//     console.log(dataJSON.date);
//     console.log(dataJSON.hygro);
//     myNewData = createTph(dataJSON);

// }


async function dosomething(data, filePath) {
    /* Saving in database the data */

    // connect to mongoDB
    mongoose.connect('mongodb://localhost:27017/test');

    let value;
    let dataJSON;
    let myNewData;

    if (filePath.includes("sensors")) {

        dataJSON = changeToJSON(data);
        console.log(dataJSON.date);
        console.log(dataJSON.measure[0].value);
        myNewData = createSensor(dataJSON);

    } else if (filePath.includes("gpsNmea")) {
        myNewData = createGPSNmea(data);
    }

    // else if (filePath.includes("rainCounter")) {

    // } else {

    // }

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
    console.log(value.loc.geojson.coordinates);

    return new GpsNmea({
        lat: value.loc.geojson.coordinates[0],
        long: value.loc.geojson.coordinates[1]
    });
}


