const Client = require('node-rest-client').Client

const client = new Client();

module.exports = (ticketId, subject, content, recipients, requestor) => {
        const requestBody = {
            subject,
            content,
            requester: requestor,
            recepientEmails: recipients,
            ticketId
        }

        const reqHeader = {
            "Content-Type": "application/json"
        }

        const args = {
            data: requestBody,
            headers: reqHeader
        }

        try {
            client.post("http://localhost:3000/notifiServ/api/v1/notifications", args, (data, res) => {
                console.log("Notificaiton request sent", data)
            })
        } catch (error) {
            console.log(error.message)
        }
    }
    /*
    exports.sendEmail = (payload) => {
        const args = {
            headers: {
                "Content-Type": "application/json"
            },
            body: {
                "subject": payload.subject,
                "content": payload.content,
                "recepientEmails": payload.recepientEmails,
                "requester": payload.requester,
                "ticketId": payload.ticketId
            }
        }

        client.post("http://localhost:3000/notifiServ/api/v1/notifications", args, (err, data) => {
            if (err) {
                return console.log(err);
            }
            console.log(data);
        })
    }
     */