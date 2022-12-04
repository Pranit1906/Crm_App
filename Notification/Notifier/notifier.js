const nodemailer = require('nodemailer')
    //nodemailer link for below info :-https://nodemailer.com/about/
function helper(testAccount) {
    const transporter = nodemailer.createTransport({
        port: 587,
        host: 'smtp.ethereal.email',
        auth: {
            user: testAccount.user,
            pass: testAccount.pass
        },
        secure: false

    });
    return transporter;
}

module.exports = helper;