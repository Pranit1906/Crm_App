const mongoose = require('mongoose')

const user = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    userId: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    emailId: {
        type: String,
        // required: true,
        // unique: true,
        lowercase: true,
        minLength: 10
    },

    createdAt: {
        type: Date,
        immutable: true,
        default: () => {
            return Date.now()
        }
    },

    updatedAt: {
        type: Date,
        default: () => {
            return Date.now()
        }
    },

    userType: {
        type: String,
        required: true,
        default: "CUSTOMER"
    },

    userStatus: {
        type: String,
        required: true,
        default: "APPROVED"
    },
    // //----------UserSchema updated for ticketSchema-------------
    // ticketCreated: {
    //     type: mongoose.SchemaTypes.ObjectId,
    //     ref: "Ticket"
    // },

    // ticketAssigned: {
    //     type: mongoose.SchemaTypes.ObjectId,
    //     ref: "Ticket"
    // },
});

module.exports = mongoose.model("User", user);