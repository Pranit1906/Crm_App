const Client = require('node-rest-client').Client

const client = new Client();

exports.client = client;
// we export client to Spy on client.post method .........

exports.sendEmail = (subject, content, ticketId, requestor, recepientEmails) => {
    const requestBody = {
        subject,
        content,
        ticketId,
        requestor: requestor,
        recepientEmails: recepientEmails
    }

    const headers = {
        "Content-type": "application/json"
    }

    const args = {
        headers: headers,
        body: requestBody
    }

    client.post("http://localhost/3000/notifiServ/api/v1/notifications", args, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            console.log(data);
        }
    })
}