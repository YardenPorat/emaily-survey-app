const sendgrid = require('sendgrid');

const helper = sendgrid.mail;
const keys = require('../config/keys');

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(keys.sendGridKey);

class Mailer extends helper.Mail {
    constructor({ subject, recipients }, content) {
        super();

        this.sgApi = sendgrid(keys.sendGridKey);
        this.from_email = 'emaily.yarden@gmail.com';
        this.subject = subject;
        this.body = content;
        this.recipients = this.formatAddresses(recipients);
        console.log(this.recipients);
        // this.addContent(this.body); ?
    }

    formatAddresses(recipients) {
        return recipients.map(({ email }) => {
            return email;
        });
    }

    async send() {
        const msg = {
            to: this.recipients,
            from: this.from_email, // Use the email address or domain you verified above
            subject: this.subject,
            html: this.body,
        };

        (async () => {
            try {
                await sgMail.sendMultiple(msg);
            } catch (error) {
                console.error(error);

                if (error.response) {
                    console.error(error.response.body);
                }
            }
        })();
    }
}

module.exports = Mailer;
