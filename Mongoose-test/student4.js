const mongoose = require('mongoose')

const studentSchema1 = new mongoose.Schema({
    name: String,
    age: Number
})
const studentModel = mongoose.model('Student4', studentSchema1);
module.exports = studentModel;