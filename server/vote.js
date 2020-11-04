Survey.updateOne(
    {
        _id: surveyId,
        recipients: {
            $elemMatch: { email: email, responded: false }, // find match in subdocument
        },
    },
    {
        $inc: { [choice]: 1 }, //increament choice of the record found
        $set: { 'recipient.$.responded': true },
        //$set=update, recipient.$ = find the record that was found in the subdocument
    }
).exec();
