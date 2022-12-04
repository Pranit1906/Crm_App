const cron = require('node-cron') //Cron is time Based Schedulling
const transporter = require('../Notifier/notifier')
const nodemailer = require('nodemailer')
const NotificationModel = require('../Models/notif.model')

/*

Code Flow for Cron Mail Sending:-
1. For Every 30 second we should get notification from our DB with un_sent Status
2. For Each Notification try send mail through mail Svc
3. Once Email is sent successfully chnge the Status of Notification from un_sent to sent
4. We will create Mail Account using nodemailer(nodemailer.createTestAccount()) function

*/
cron.schedule("*/3 * * * * *", async() => { //(*second *minutes *hours *Day *Month *Year)
    try {
        const notifications = await NotificationModel.find({
            status: "UN_SENT"
        })
        console.log(notifications.length);

        let testAccount = await nodemailer.createTestAccount();

        notifications.forEach(async notification => {

            const mailData = {
                from: testAccount.user,
                to: notification.recepientEmails,
                subject: notification.subject,
                text: notification.body
            };

            transporter(testAccount).sendMail(mailData, async(err, data) => {
                if (err) {
                    console.log(err)
                    console.log('Error occured in sending Mail')
                } else {
                    console.log(data);
                    const updatedNotification = await NotificationModel.findOne({ _id: notification._id }).exec();
                    updatedNotification.status = "SENT",
                        console.log(updatedNotification)
                    updatedNotification.save();
                }
            });
        });
    } catch (err) {
        console.log("Error in creating Cron Job")

    }
})