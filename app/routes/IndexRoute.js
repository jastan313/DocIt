var path = require('path');
module.exports = function (app) {
    // Default GET to index.html
    app.get('/', function (req, res) {
        res.sendFile(path.resolve('./public/views/index.html'));
    });

    app.get('/login', function (req, res) {
        res.sendFile(path.resolve('./public/views/index.html'));
    });


    app.get('*', function (req, res) {
        res.redirect('back');
    });
};