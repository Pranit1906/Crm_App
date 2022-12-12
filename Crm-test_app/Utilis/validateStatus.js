const { ticketStatus } = require('../Utilis/constant');

exports.statusValidate = async(req, res, next) => {
    const status = req.body.status;
    const statusTypes = [ticketStatus.open, ticketStatus.closed, ticketStatus.in_progress, ticketStatus.blocked];

    if (status && !statusTypes.includes(status)) {
        return res.status(400).send({
            message: 'Invalid Status possible values CLOSED || BLOCED || IN_PROGRESS || OPEN '
        });
    }

    next();
}