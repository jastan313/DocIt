var path = require('path');
module.exports = function (app) {
    // Default GET to index.html
    app.get('*', function (req, res) {
        res.sendFile(path.resolve('./public/views/index.html'));
    });
    
    // PING: Calls to check server.
    app.get('/ping', function (req, res) {
        res.send('Server has received ping.');
    });
    app.get('/ping/:id', function (req, res) {
        res.send('Server has received ping with ID: ' + req.params.id + ".");
    });
};

