const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    userId: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        minLength: 10
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
})

module.exports = mongoose.model("Users", userSchema);