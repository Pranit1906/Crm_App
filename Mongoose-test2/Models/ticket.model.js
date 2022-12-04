const mongoose = require('mongoose')

const ticketTable = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    ticketPriority: {
        type: Number,
        default: 4,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: ["Open", "Closed"],
        required: true
    },
    reporter: {
        type: String
    },
    assignee: {
        type: String
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
    }

});

const tickets = mongoose.model('TicketTable', ticketTable);
module.exports = tickets;