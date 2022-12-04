const mongoose = require('mongoose')

const ticket = require("../Models/ticket.model")

exports.createTicket = async(req, res) => {
    //validate title
    if (!req.body.title) {
        return res.status(400).send({
            message: "Title Not Found",
        });
    }

    if (!req.body.description) {
        return res.status(400).send({
            message: "Description Not provided"
        })
    }

    //creating a ticket
    const ticketObj = ticket.create({
        title: req.body.title,
        ticketPriority: req.body.ticketPriority,
        description: req.body.description,
        status: req.body.status,
        reporter: req.userId //this will be retrieved from middleware
    });
    try {
        const ticket = await ticket.create(ticketObj)
    } catch (err) {

    }
}