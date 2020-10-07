const mailer = require('nodemailer')
const EmailTemplates = require('email-templates')
const path = require('path')

const htmlTemplates = require('../email-templates')
const conf = require('../configs/configs')

const emailTemplates = new EmailTemplates({
    message: null,
    views: {
        root: path.join(process.cwd(), 'email-templates')
    }
})

const transporter = mailer.createTransport({
    service: 'gmail',
    auth: {
        user: conf.ROOT_EMAIL,
        pass: conf.ROOT_EMAIL_PASSWORD
    }
});

class EmailService {
    async sendMail(userMail, action, context) {
        try {

            const templateInfo = htmlTemplates[action]
            const html = await emailTemplates.render(templateInfo.templateFileName, {...context})

            const mailOptions = {
                from: 'NO REPLY CAR SHOP',
                to: userMail,
                subject: templateInfo.subject,
                html
            }
            return transporter.sendMail(mailOptions)
        } catch (e) {
            console.log(e + ' ========>?<')
        }

    }
}


module.exports = new EmailService();
