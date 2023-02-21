const Ticket = require('../../Models/ticket.model');
const objectConverter = require('../../Utilis/objectConverter');
const User = require('../../Models/user.model')
const { userType } = require('../../Utilis/constants')
const validate = require('../../Utilis/validateTicketStatus')


//Flow to write code for ticketFindAll
/*
1. Find the user that can be engg or customer
2. check if userType is Engg or Customer
3. create a queryObj , once userType is found add assignee to queryObj for Engg & reporter for Customer
4. using Tiket model using findAll(queryObj) we shall get all tickets  
*/

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
    let status = req.query.Status;
    //validate status not working.................(status == ticketStatus.open || status == ticketStatus.closed || status == ticketStatus.in_progress || status == ticketStatus.blocked))
    if (status) { //&& (validate.statusValidate)
        queryObj.Status = status;
    }

    if (users.userType == userType.engg) {
        queryObj.assignee = req.userId;
    } else if (users.userType == userType.customer) {
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