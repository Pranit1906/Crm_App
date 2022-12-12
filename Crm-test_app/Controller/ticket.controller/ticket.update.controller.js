const Ticket = require('../../Models/ticket.model');
const User = require('../../Models/user.model');
const { userType } = require('../../Utilis/constant');
const { sendEmail } = require('../../Utilis/notificationClient')
const objectConverter = require('../../Utilis/objectConverter')
    /*
    Code flow for update:-
    1. Get id(req.userId) from jwt token 
    2. Get user doc using the id(req.userId)
    3.If userType ==(Engg/Cust/Admin) matches (reporter/Assignee) then allow update of ticket
    4. Else throw error 
    */


exports.updateTicket = async(req, res) => {
        try {
            const ticket = await Ticket.findOne({ _id: req.params.id }).exec();

            const user = await User.findOne({ userId: req.userId }).exec();

            if (user.userType == userType.admin ||
                ticket.reporter == user.userId ||
                ticket.assignee == user.userId) {
                //    Allow Update the ticket
                ticket.status = req.body.status != undefined ? req.body.status : ticket.status;

                const updatedTicket = await ticket.save();

                const engineer = await User.findOne({
                    userId: ticket.assignee
                });

                const reporter = await User.findOne({
                    userId: ticket.reporter
                });

                //doc for sendEmail :-https://relevel-courses.s3.amazonaws.com/uploads/backend-development-course-0005/a0bc0687a70046fb99122363ccaffc7c.pdf
                sendEmail(
                    ticket._id,
                    `Ticket with id:${ticket._id} created`,
                    ticket.description, [reporter.emailId, engineer.emailId].toString(),
                    'CRM app'
                )

                res.status(200).send(updatedTicket)
                    // res.status(200).send(objectConverter.ticketConvertor(updatedTicket))

            } else {
                return res.status(401).send({
                    message: 'User Not Authorised to change the ticket'
                });
            }
        } catch (error) {
            return res.status(500).send({
                message: 'Internal Error Occurred'
            })
        }

    }
    /*

       Class Deck Code
        try {
            const ticket = await Ticket.findOne({
                _id: req.params._id
            });
            if (ticket.reporter == req.userId) {
                //Allow update
                ticket.title = req.body.title != undefined ? req.body.title : ticket.title,
                    ticket.description = req.body.description != undefined ? req.body.description : ticket.description,
                    ticket.ticketPriority = req.body.ticketPriority != undefined ? req.body.ticketPriority : ticket.ticketPriority,
                    ticket.Status = req.body.Status != undefined ? req.body.Status : ticket.Status
            };
            var updatedResponse = await ticket.save();
            res.Status(200).send(objectConverter.ticketConvertor(updatedResponse))
        } catch (error) {
            res.Status(401).send({
                message: "Ticket can be updated by customer only!"
            })
        }

    }
    */