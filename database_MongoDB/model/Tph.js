import mongoose from 'mongoose';
const { Schema, model } = mongoose;


const tphSchema = new Schema({
    time: {
        type: String
    },
    temp: {
        type: Number
    },
    hum: {
        type: Number
    },
    pre: {
        type: Number
    }
})

const Tph = model('Tph', tphSchema, 'tph-collection');
export default Tph;