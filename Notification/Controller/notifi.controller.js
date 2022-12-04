const NotificationModel = require("../Models/notif.model")

exports.acceptNotificationRequest = async(req, res) => {
    const notificationObject = {
        subject: req.body.subject,
        content: req.body.content,
        recepientEmails: req.body.recepientEmails,
        requester: req.body.requester,
        ticketId: req.body.ticketId
    };
    try {
        const notification = await NotificationModel.create(notificationObject);
        res.status(201).send({
            requestId: notification.ticketId,
            status: "Accepted Request"
        })
    } catch (err) {
        res.status(500).send(
            console.log(`Error while accepting a notification request : ${err.message}`));
    }
}

exports.getNotificationStatus = async(req, res) => {

    try {
        const reqId = req.params.id;
        const notification = await NotificationModel.findOne({
            ticketId: reqId
        }).exec()
        res.status(200).send({
            requestId: notification.ticketId,
            subject: notification.subject,
            content: notification.content,
            recepientEmails: notification.recepientEmails,
            status: notification.status
        })
    } catch (err) {
        console.log(`Error while fetching a notification request : ${err.message}`);
    }
}