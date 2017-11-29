module.exports = function (app, User) {
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

    // GET: Get a specific user by alias
    app.get('/api/users/alias/:alias', function (req, res) {
        User.find({alias: req.params.alias}, function (err, result) {
            if (err)
                res.send(err);
            res.json(result); // Return the specific user
        });
    });

    // GET: Get a specific user by email
    app.get('/api/users/email/:email', function (req, res) {
        User.find({email: req.params.email}, function (err, result) {
            if (err)
                res.send(err);
            res.json(result); // Return the specific user
        });
    });

    // POST: Create a user
    app.post('/api/users', function (req, res) {
        var user = new User();
        user.email = req.body.email;
        user.alias = req.body.alias;
        user.password = req.body.password;
        user.save(function (err, result) {
            if (err)
                res.send(err);
            res.json(result); // Return created user
        });
    });

    // PUT: Update a user
    app.put('/api/users/:id', function (req, res) {
        User.findbyId(req.params.id, function (err, user) {
            if (req.body.login_attempts) {
                user.login_attempts = req.body.login_attempts;
            }
            if (req.body.docs) {
                user.documents = req.body.docs;
            }
            if (req.body.comments) {
                user.comments = req.body.comments;
            }
            user.save(function (err, result) {
                if (err)
                    res.send(err);
                res.json(result); // Return updated user
            });
        });
    });

    // PUT: Update a user by removing Doc reference
    app.put('/api/users/:uid/docs/:did', function (req, res) {
        User.update({_id: req.params.uid}, {$pull: {documents: req.params.did}});
    });

    // DELETE: Delete a user
    app.delete('/api/users/:id', function (req, res) {
        User.remove(req.params.id, function (err, result) {
            if (err)
                res.send(err);
            res.json(result); // Return deleted user
        });
    });
};

