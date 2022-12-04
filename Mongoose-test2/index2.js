const mongoose = require('mongoose');

const ticket = require('./Models/ticket.model');

mongoose.connect("mongodb://localhost/demodb4", { family: 4 }, (err) => {
    if (err) {
        console.log('Error Occured')
    } else {
        console.log('Connected To DB')
        dbOperations();
    }
})

async function dbOperations() {
    try {
        const ticketT = await ticket.create({
            title: "Movie Booking",
            ticketPriority: 2,
            description: "Bhediya 9:00pm show Imax Show at Viviana Mall",
            status: "Open",
            reporter: "reporter",
            assignee: "assignee",

        })
        console.log(ticketT)
    } catch (err) {
        console.log(err.message)
    }
}