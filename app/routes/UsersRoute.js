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
        User.findById(req.params.id, function (err, result) {
            if (err)
                res.send(err);
            res.json(result); // Return the specific user
        });
    });

    // GET: Get a specific user by alias
    app.get('/api/users/alias/:alias/password/:password', function (req, res) {
        User.find({alias: req.params.alias}, function (err, result) {
            if (err)
                res.send(err);
            var data = result.length === 0 ? null : result;
            if (data) {
                var user = data['0'];
                var userData = {};
                userData.exists = true;
                if (user.password === req.params.password) {
                    userData.auth = true;
                    userData._id = user._id;
                } else {
                    userData.auth = false;
                    userData._id = user._id;
                    userData.login_attempts = user.login_attempts;
                }
                res.json(userData);  // Return the specific user
            } else {
                res.json({"exists": false}); // Return user does not exist
            }

        });
    });

    // GET: Get a specific user by email
    app.get('/api/users/email/:email', function (req, res) {
        User.find({email: req.params.email}, function (err, result) {
            if (err)
                res.send(err);
            var user = {
                "_id": result._id,
                "alias": result.alias,
                "email": result.email,
                "documents": result.documents,
                "comments": result.comments,
                "login_attempts": result.login_attempts
            }
            res.json(user); // Return specific user
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
            var data = Array.isArray(result) ? null : result;
            var userData = {};
            if (data.hasOwnProperty('errors')) {
                userData.errors = true;
                if (data.errors.email) {
                    data.email_error = true;
                } else {
                    data.email_error = false;
                }
                if (data.errors.alias) {
                    data.alias_error = true;
                } else {
                    data.alias_error = false;
                }
            } else {
                userData.errors = false;
                userData._id = result._id;
                userData.alias = result.alias;
                userData.email = result.email;
                userData.documents = result.documents;
                userData.comments = result.comments;
                userData.login_attempts = result.login_attempts;
            }
            res.json(userData); // Return created user
        });
    });

    // PUT: Update a user
    app.put('/api/users/:id', function (req, res) {
        User.findById(req.params.id, function (err, user) {
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
                var user = {
                    "_id": result._id,
                    "alias": result.alias,
                    "email": result.email,
                    "documents": result.documents,
                    "comments": result.comments,
                    "login_attempts": result.login_attempts
                }
                res.json(user); // Return updated user
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
            var user = {
                "_id": result._id,
                "alias": result.alias,
                "email": result.email,
                "documents": result.documents,
                "comments": result.comments,
                "login_attempts": result.login_attempts
            }
            res.json(user); // Return deleted user
        });
    });
};

