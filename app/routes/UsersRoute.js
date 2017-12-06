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
            
            // If returned result is an non-empty array, we have retrieved
            // a user by its Alias
            if (data) {
                // Return the retrieved user, set exists to true
                var user = data['0'];
                var userData = {};
                userData.exists = true;
                
                // If password authenticates, set auth to true
                if (user.password === req.params.password) {
                    userData.auth = true;
                    userData._id = user._id;
                }
                
                // If password does not authenticate, set auth to false
                else {
                    userData.auth = false;
                    userData._id = user._id;
                    userData.login_attempts = user.login_attempts;
                }
                res.json(userData);  // Return the specific user
            } 
            
            // If returned result is empty, the user does not exist, set
            // exists to false
            else {
                res.json({"exists": false}); // Return user does not exist
            }

        });
    });

    // GET: Get a specific user by email
    app.get('/api/users/email/:email', function (req, res) {
        User.find({email: req.params.email}, function (err, result) {
            if (err)
                res.send(err);
            
            // Return the retrieved user (only relevant information)
            var user = {
                "_id": result._id,
                "alias": result.alias,
                "email": result.email,
                "login_attempts": result.login_attempts
            }
            res.json(user);
        });
    });

    // POST: Create a user
    app.post('/api/users', function (req, res) {
        // Create a user using given information
        var user = new User();
        user.email = req.body.email;
        user.alias = req.body.alias;
        user.password = req.body.password;
        user.save(function (err, result) {
            var data = Array.isArray(result) ? null : result;
            var userData = {};
            
            // If user create unsuccessful, set errors to true
            if (err) {
                userData.errors = true;
                
                // Set email_error to true if email was already taken
                if (err.errors.email) {
                    userData.email_error = true;
                } else {
                    userData.email_error = false;
                }
                
                // Set alias_error to true if Alias was already taken
                if (err.errors.alias) {
                    userData.alias_error = true;
                } else {
                    userData.alias_error = false;
                }
                res.send(userData); // Return error information
            } 
            
            // If user create successful, return retrieved user (only relevant information)
            else {
                var userData = {};
                userData.errors = false;
                userData._id = result._id;
                userData.alias = result.alias;
                userData.email = result.email;
                res.json(userData);
            }

        });
    });

    // PUT: Update a user
    app.put('/api/users/:id', function (req, res) {
        User.findById(req.params.id, function (err, user) {
            
            // If new login_attempts information, update it
            if (req.body.login_attempts) {
                user.login_attempts = req.body.login_attempts;
            }
            user.save(function (err, result) {
                if (err)
                    res.send(err);
                
                // Return the updated user (only relevant information)
                var user = {
                    "_id": result._id,
                    "alias": result.alias,
                    "email": result.email,
                    "login_attempts": result.login_attempts
                }
                res.json(user);
            });
        });
    });

    // DELETE: Delete a user
    app.delete('/api/users/:id', function (req, res) {
        User.findByIdAndRemove(req.params.id, function (err, result) {
            if (err)
                res.send(err);
            
            // If Doc delete successful, return id of deleted user
            if (result) {
                res.json({_id: result._id});
            } 
            
            // If Doc was already deleted, return null
            else {
                res.json(null);
            }
        });
    });
};

