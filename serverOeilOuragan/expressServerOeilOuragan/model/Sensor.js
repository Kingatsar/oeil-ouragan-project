const mongoose = require('mongoose');
const { Schema, model } = mongoose;


const sensorSchema = new Schema({
    time: {
        type: String
    },
    temp: {
        type: Number
    },
    pre: {
        type: Number
    },
    hum: {
        type: Number
    },
    lum: {
        type: Number
    },
    wind_dir: {
        type: Number
    },
    wind_speed: {
        type: Number
    },
    wind_speed_max: {
        type: Number
    }
})

const Sensor = model('Sensor', sensorSchema, 'sensor-collection');
module.export = Sensor;