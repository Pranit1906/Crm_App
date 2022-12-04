const mongoose = require('mongoose');
const addressSchema = require('./user.studentDetails.model')

const studentSchemaWithValidators = new mongoose.Schema({
    name: String,
    age: {
        type: Number, //if we change to String it will not throw error due to in-built type casting
        min: 16
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        minLength: 15
    },
    createdAt: {
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
    //Using Custom Validators for subjects field
    subjects: {
        type: [String],
        validate: {
            // validate field has two fields validator(return boolean) and message with prop function return string        
            validator: s => s.length > 1,
            message: (props) => `${props.value} subject list is not provided`
        }
    },
    address: addressSchema
})

module.exports = mongoose.model('studentsWithValidator', studentSchemaWithValidators);