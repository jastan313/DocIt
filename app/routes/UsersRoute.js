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
    
    // GET: Get a specific user by alias
    app.get('/api/users/alias/:alias', function (req, res) {
        User.find({'alias': alias}, function (err, result) {
            if (err)
                res.send(err);
            res.json(result); // Return the specific user
        });
    });

    // GET: Get a specific user by email
    app.get('/api/users/email/:email', function (req, res) {
        User.find({'email': email}, function (err, result) {
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
        user.save(function (err) {
            if (err)
                res.send(err);
            res.json({id: user._id, message: 'User, ' + req.body.alias + ", created."});
        });
    });

    // PUT: Update a user
    app.put('/api/users/:id', function (req, res) {
        User.findbyId(req.params.id, function (err, user) {
            user.documents = req.body.docs;
            user.comments = req.body.comments;
            user.save(function (err) {
                if (err)
                    res.send(err);
                res.json({id: user._id, message: 'User, ' + req.body.alias + ", updated."});
            });
        });
    });
    
    // DELETE: Delete a user
    app.delete('/api/users/:id', function (req, res) {
        User.remove(req.params.id, function (err, result) {
            if (err)
                res.send(err);
            res.json({message: 'User deleted.'});
        });
    });
};

