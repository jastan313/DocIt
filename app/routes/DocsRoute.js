module.exports = function (app) {
    // GET: Get all docs
    app.get('/api/docs', function (req, res) {
        Doc.find(function (err, result) {
            if (err)
                res.send(err);
            res.json(result); // Return all docs
        });
    });

    // GET: Get docs based on user id
    app.get('/api/docs/user/:id', function (req, res) {
        Doc.find({author: req.params.id}).exec(function (err, result) {
                    if (err)
                        res.send(err);
                    res.json(result); // Return docs
                });
    });

    // GET: Get docs based on ratings, limited to top num items
    app.get('/api/docs/items/:num', function (req, res) {
        Doc.find({published: true})
                .sort({'rating': -1})
                .limit(req.params.num)
                .exec(function (err, result) {
                    if (err)
                        res.send(err);
                    res.json(result); // Return docs
                });
    });

    // GET: Get docs based on ratings within the past d days, limited to top num items
    app.get('/api/docs/items/:num/days/:d', function (req, res) {
        Doc.find({published: true, timestamp: {$gte: new Date(new Date() - req.params.d * 60 * 60 * 24 * 1000)}})
                .sort({'rating': -1})
                .limit(req.params.num)
                .exec(function (err, result) {
                    if (err)
                        res.send(err);
                    res.json(result); // Return docs
                });
    });

    // GET: Get a specific doc
    app.get('/api/docs/:id', function (req, res) {
        Doc.findbyId(req.params.id, function (err, result) {
            if (err)
                res.send(err);
            res.json(result); // Return the specific doc
        });
    });

    // POST: Create a doc
    app.post('/api/docs', function (req, res) {
        var doc = new Doc();
        doc.author = req.body.user_id;
        doc.title = req.body.title;
        doc.body = req.body.body;
        doc.save(function (err) {
            if (err)
                res.send(err);
            res.json({id: doc._id, message: 'Doc, \"' + req.body.title + "\", created."});
        });
    });

    // PUT: Update a doc
    app.put('/api/docs/:id', function (req, res) {
        Doc.findbyId(req.params.id, function (err, doc) {
            doc.title = req.body.title;
            doc.body = req.body.body;
            doc.comments = req.body.comments;
            doc.save(function (err) {
                if (err)
                    res.send(err);
                res.json({id: doc._id, message: 'Doc, \"' + req.body.title + "\", updated."});
            });
        });
    });

    // DELETE: Delete a doc
    app.delete('/api/docs/:id', function (req, res) {
        Doc.remove(req.params.id, function (err, result) {
            if (err)
                res.send(err);
            res.json({message: 'Doc deleted.'});
        });
    });
};

