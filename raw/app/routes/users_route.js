module.exports = function (app) {
    // GET: Get all users
    app.get('/api/users', function (req, res) {
        User.find(function (err, result) {
            if (err)
                res.send(err);
            res.json(result); // Return all users
        });
    });

    // GET: Get a specific user by id
    app.get('/api/users/:id', function (req, res) {
        User.findbyId(req.params.id, function (err, result) {
            if (err)
                res.send(err);
            res.json(result); // Return the specific user
        });
    });
    
    // POST: Create a user
    app.post('/api/users', function (req, res) {
        var user = new User();
        user.account.username = req.body.username;
        user.account.password = req.body.password;
        user.save(function (err) {
            if (err)
                res.send(err);
            res.json({message: 'User, ' + req.body.username + ", created."});
        });
    });

    // PUT: Update a user
    app.put('/api/users/:id', function (req, res) {
        User.findbyId(req.params.id, function (err, result) {
            result.documents = req.body.docs;
            result.comments = req.body.comments;
            user.save(function (err) {
                if (err)
                    res.send(err);
                res.json({message: 'User, ' + req.body.username + ", updated."});
            });
        });
    });
};

