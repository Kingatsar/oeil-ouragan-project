// import mongoose from 'mongoose';
const mongoose = require('mongoose');
const { Schema, model } = mongoose;


const gpsNmeaSchema = new Schema({
    lat: {
        type: Number
    },
    long: {
        type: Number
    }
})

const GpsNmea = model('GpsNmea', gpsNmeaSchema, 'gpsNmea-collection');
export default GpsNmea;