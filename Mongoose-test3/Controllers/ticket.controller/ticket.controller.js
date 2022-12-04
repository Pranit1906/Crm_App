const tickets = require('../../Models/ticket.model')
const User = require('../../Models/user.model')
const constants = require('../../Utilis/constants')
const objectConverter = require('../../Utilis/objectConverter')
const sendEmail = require('../../Utilis/NotificationClient')
    /*
    Flow of ticket creation...:-
    1. title, description check
    2. Retrieve Request of ticket from body in ticketObj
    3. Find Engineer
    4. assign Engineer
    5. update ticketObj.assignee , update Engg Doc
    6. create ticket
    7. update Customer doc
    */

exports.createTicket = async(req, res) => {

    //Validate Title from body
    if (!req.body.title) {
        res.status(400).send({
            message: 'Title Not Found!'
        })
    }
    //Validate Description from body
    if (!req.body.description) {
        res.status(400).send({
            message: 'Description Not Found!'
        })
    }

    //Other stuffs

    const ticketObj = {
        title: req.body.title,
        description: req.body.description,
        tickectPriority: req.body.tickectPriority,
        Status: req.body.Status,
        reporter: req.userId //tokenvalidator value after jwt.verify..
    }
    let engineer;
    try {
        // Find Engineer for ticket to be assigneed    
        engineer = await User.findOne({
            userType: constants.userType.engg,
            userStatus: constants.userStatus.approved
        })
    } catch (error) {
        res.status(500).send({
            message: "Error Occurred!"
        })
    }

    ticketObj.assignee = engineer.userId;
    // console.log(tickets)
    try {
        const ticket = await tickets.create(ticketObj);
        if (ticket) {
            const customer = await User.findOne({
                userId: req.userId // id retrieve from token jwt.verify==> decode.id==>req.userid
            })

            if (customer.ticketCreated) {
                customer.ticketCreated.push(ticket._id);
            } else {
                customer.ticketCreated = [ticket._id];
            }
            await customer.save();
            //console.log(customer)

            if (engineer.ticketAssigned) {
                engineer.ticketAssigned.push(ticket._id);
            } else {
                engineer.ticketAssigned = [ticket._id];
            }

            await engineer.save();
            // console.log(engineer)

            sendEmail(
                    ticket._id,
                    `Ticket with id:${ticket._id} created`,
                    ticket.description, [customer.emailId, engineer.emailId].toString(),
                    'CRM app'
                )
                //02:22:00
                // console.log(sendEmail)
            res.status(201).send(objectConverter.ticketConvertor(ticket));
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message: "Error Occurred in Ticket Creation!"
        })
    }
}