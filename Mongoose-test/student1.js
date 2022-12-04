const mongoose = require('mongoose')

const addressSchema = new mongoose.Schema({
    lane1: String,
    lane2: String,
    street: String,
    city: String,
    country: String,
    pinCode: Number
})

const studentSchema = new mongoose.Schema({
    name: String,
    age: {
        type: Number,
        min: 16
    },
    email: {
        type: String,
        required: true,
        // lowercase: true,
        minLength: 15
    },
    createdAT: {
        type: Date,
        immutable: true,
        default: () => {
            return Date.now();
        }
    },
    updatedAt: {
        type: Date,
        default: () => {
            return Date.now();
        }
    },
    course: mongoose.SchemaTypes.ObjectId,
    subjects: {
        type: [String],
        validate: {
            validator: (value) => value.length > 1,
            message: props => `${props.value}`
        }
    },
    address: addressSchema
})

module.exports = mongoose.model("student1", studentSchema);