import mongoose from 'mongoose';
const { Schema, model } = mongoose;


const rainCounterSchema = new Schema({
    time: {
        type: String
    }
})

const RainCounter = model('RainCounter', rainCounterSchema, 'rainCounter-collection');
export default RainCounter;