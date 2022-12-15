const mongoose = require('mongoose')

const ticket = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    ticketPriority: {
        type: Number,
        default: 4,
        required: true
    },

    status: {
        type: String,
        default: "OPEN",
        required: true
    },

    reporter: String,

    assignee: String,

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

})
const ticketSChema = mongoose.model('Tickets', ticket)
module.exports = ticketSChema;