import mongoose from 'mongoose';
const { Schema } = mongoose;

const Subscribe = new Schema({
    email: String, // String is shorthand for {type: String}


}); const Email = mongoose.model('Email', Subscribe);

export default Email;
