module.exports = function (app, Doc) {
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
        Doc.find({author: req.params.id})
                .sort({'date': -1})
                .exec(function (err, result) {
                    if (err)
                        res.send(err);
                    res.json(result); // Return docs
                });
    });

    // GET: Get docs based on ratings, limited to top num items
    app.get('/api/docs/items/:num', function (req, res) {
        Doc.find({published: true})
                .sort({'rating': -1})
                .limit(parseInt(req.params.num))
                .populate('author')
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
                .limit(parseInt(req.params.num))
                .populate('author')
                .exec(function (err, result) {
                    if (err)
                        res.send(err);
                    res.json(result); // Return docs
                });
    });

    // GET: Get a specific doc
    app.get('/api/docs/:id', function (req, res) {
        Doc.findById(req.params.id)
                .populate('author')
                .exec(function (err, result) {
                    if (err)
                        res.send(err);
                    res.json(result); // Return the specific doc
                });
    });

    // POST: Create a doc
    app.post('/api/docs', function (req, res) {
        var doc = new Doc();
        doc.title = req.body.title;
        doc.author = req.body.author;
        doc.body = req.body.body;
        if (req.body.published) {
            doc.published = req.body.published;
        }
        doc.save(function (err, result) {
            if (err)
                res.send(err);
            res.json(result); // Return created doc
        });
    });

    // PUT: Update a doc
    app.put('/api/docs/:id', function (req, res) {
        Doc.findById(req.params.id, function (err, doc) {
            if (req.body.title) {
                doc.title = req.body.title;
            }
            if (req.body.body) {
                doc.body = req.body.body;
            }
            if (req.body.published) {
                doc.published = req.body.published;
            }
            if (req.body.ratings) {
                doc.ratings = req.body.ratings;
            }
            if (req.body.comments) {
                doc.comments = req.body.comments;
            }
            doc.save(function (err, result) {
                if (err)
                    res.send(err);
                res.json(result); // Return updated doc
            });
        });
    });

    // DELETE: Delete a doc
    app.delete('/api/docs/:id', function (req, res) {
        Doc.remove(req.params.id, function (err, result) {
            if (err)
                res.send(err);
            res.json(result); // Return deleted doc
        });
    });
};

