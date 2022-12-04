const mongoose = require('mongoose')

const addressSchema = new mongoose.Schema({
    lane1: String,
    lane2: String,
    city: String,
    country: String,
    pincode: Number
});

const studentSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number,
    createdAt: Date,
    updatedAt: Date,
    course: mongoose.SchemaTypes.ObjectId, //this is called Referencing in mongoDb 
    // Here course will have values of type ObjectId
    subjects: [String],
    address: addressSchema
})

module.exports = mongoose.model('Students', studentSchema);
module.exports = addressSchema;