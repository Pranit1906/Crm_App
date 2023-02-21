const Ticket = require('../../Models/ticket.model');
const objectConverter = require('../../Utilis/objectConverter')

exports.ticketFindById = async(req, res) => {
    try {
        const ticket = await Ticket.findOne({
            _id: req.params.id
        }).exec();
        res.status(200).send(objectConverter.ticketConvertor(ticket))
    } catch (error) {
        res.status(500).send({
            message: 'Ticket Not found!'
        })
    }


}