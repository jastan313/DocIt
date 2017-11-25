var path = require('path');
module.exports = function (app, smtpTransport) {
    // Default GET to index.html
    app.get('*', function (req, res) {
        res.sendFile(path.resolve('./public/views/index.html'));
    });

    // SEND: Call to send email
    app.post('/email', function (req, res) {
        var mailOptions = {
            from: "|DOCIT| <donotreply@docit.com>",
            to: req.query.to,
            subject: req.query.subject,
            text: req.query.text
        }
        smtpTransport.sendMail(mailOptions, function (error, result) {
            if (error)
                res.json(result);
            res.json(result);
        });
    });

};

