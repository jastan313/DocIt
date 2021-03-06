module.exports = function (app, smtpTransport) {
    // SEND: Call to send email
    app.post('/email', function (req, res) {
        var mailOptions = {
            from: "|DOCIT| <noreply.docit@gmail.com>",
            to: req.body.to,
            subject: req.body.subject,
            text: req.body.text
        }
        smtpTransport.sendMail(mailOptions, function (error, result) {
            if (error)
                res.json(result);
            res.json(result);
        });
    });
};