const Ticket = require('../../Models/ticket.model');
const objectConverter = require('../../Utilis/objectConverter');
const User = require('../../Models/user.model')
const { userType } = require('../../Utilis/constant')
const validate = require('../../Utilis/validateStatus')




exports.findAllTickets = async(req, res) => {
    let users
    try {
        users = await User.findOne({
            userId: req.userId
        }).exec()
    } catch (error) {
        res.status(500).send({
            message: 'Internal Error Occurred'
        })
    }

    let queryObj = {};
    let status = req.query.status;

    if (status) { //&& (validate.statusValidate)
        queryObj.status = status;
    }

    if (users.userType == "ENGINEER") {
        queryObj.assignee = req.userId;
    } else if (users.userType == "CUSTOMER") {
        queryObj.reporter = req.userId;
    }

    let tickets
    try {
        tickets = await Ticket.find(queryObj).exec();
        res.status(200).send(objectConverter.ticketListConvertor(tickets))
    } catch (error) {
        res.status(500).send({
            message: "Interanl Error Occured"
        })
    }

    // console.log(tickets)

}

/*
 
Class Deck Code

let queryObj = {
    assignee: req.userId
}
if (req.query.status) {
    queryObj.status = req.query.status;
}
try {
    const tickets = await Ticket.findOne(queryObj);
    res.status(200).send(objectConverter.ticketConvertor(tickets))
} catch (error) {
    res.status(500).send({
        message: 'Error in finding tickets'
    })
}

*/