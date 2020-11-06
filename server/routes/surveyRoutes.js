const _ = require('lodash');
const { Path } = require('path-parser');
const { URL } = require('url');
const requireLogin = require('../middleware/requireLogin');
const requireCredits = require('../middleware/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');
const mongoose = require('mongoose');
const keys = require('../config/keys');

const Survey = mongoose.model('surveys');

module.exports = app => {
    app.get('/api/surveys', requireLogin, async (req, res) => {
        const surveys = await Survey.find({ _user: req.user.id }).select({
            recipients: false,
        });

        res.send(surveys);
    });

    app.get('/api/surveys/:surveyId/:choice', (req, res) => {
        console.log('api/surveys/:surveyId/:choice');
        res.redirect(`${redirectDomain}/thankyou`);
    });

    app.post('/api/surveys/delete', requireLogin, async (req, res) => {
        const { id } = req.body;
        console.log('api/surveys/delete:', 'survey:', id);

        try {
            await Survey.findOneAndDelete({
                _id: id,
                _user: req.user.id,
            });
            const surveys = await Survey.find({ _user: req.user.id }).select({
                recipients: false,
            });

            res.send(surveys);
        } catch (err) {
            console.log(err);
            res.status(403).send('OK');
        }
    });

    app.post('/api/surveys/webhooks', (req, res) => {
        req.body
            .map(({ email, url }) => {
                if (url) {
                    const p = new Path('/api/surveys/:surveyId/:choice');
                    const match = p.test(new URL(url).pathname);
                    if (match) {
                        return {
                            email,
                            surveyId: match.surveyId,
                            choice: match.choice,
                        };
                    }
                }
            })
            .forEach(event => {
                if (event) {
                    const { surveyId, email, choice } = event;
                    Survey.updateOne(
                        {
                            _id: surveyId,
                            recipients: {
                                $elemMatch: { email: email, responded: false },
                            },
                        },
                        {
                            $inc: { [choice]: 1 },
                            $set: { 'recipients.$.responded': true },
                            lastResponded: new Date(),
                        }
                    ).exec();
                }
            });
        res.send({});
    });

    app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
        const { title, subject, body, recipients } = req.body;

        const survey = new Survey({
            title,
            subject,
            body,
            recipients: recipients
                .split(',')
                .map(email => ({ email: email.trim() })),
            _user: req.user.id,
            dateSent: Date.now(),
        });

        // Great place to send an email!
        const mailer = new Mailer(survey, surveyTemplate(survey));

        try {
            await mailer.send();
            await survey.save();
            req.user.credits -= 1;
            const user = await req.user.save();
            res.send(user);
        } catch (err) {
            console.log(err);
            res.status(422).send(err);
        }
    });
};
