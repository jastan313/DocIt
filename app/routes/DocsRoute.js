module.exports = function (app, Doc) {
    // GET: Get docs based on user id
    app.get('/api/docs/user/:id', function (req, res) {
        // Doc find by given user id, sorted by date
        Doc.find({author: req.params.id})
                .sort({'date': -1})
                .exec(function (err, result) {
                    if (err)
                        res.send(err);
                    res.json(result); // Return docs
                });
    });

    // GET: Get docs based on ratings within the past d days, limited to top num items
    app.get('/api/docs/items/:num/days/:d', function (req, res) {
        // Calculate the time cutoff date
        var pastDate = new Date(new Date().getTime() - req.params.d * 60 * 60 * 24 * 1000);
        // Doc find by published Docs with updated dates that are before the cutoff date,
        // sorted by date, limited to num items, with the author field populated
        // with (id and) alias
        Doc.find({published: true, date: {$gte: pastDate}})
                .sort({'rating': -1})
                .limit(parseInt(req.params.num))
                .populate('author', 'alias')
                .exec(function (err, result) {
                    if (err)
                        res.send(err);
                    res.json(result); // Return selected docs
                });
    });

    // GET: Get a specific doc
    app.get('/api/docs/:id', function (req, res) {
        // Doc find by its id, with the author field populated
        // with (id and) alias
        Doc.findById(req.params.id)
                .populate('author', 'alias')
                .exec(function (err, result) {
                    if (err)
                        res.send(err);
                    res.json(result); // Return the specific doc
                });
    });

    // POST: Create a doc
    app.post('/api/docs', function (req, res) {
        // Create a Doc using given information, set published to true if given,
        // and save the new Doc
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

            // If Doc create successful, populate author field
            // with (id and) alias, and return the new Doc
            result.populate("author", "alias")
                    .execPopulate().then(function (err, result) {
                if (err)
                    res.send(err);

                res.json(result); // Return the updated doc
            });
        });
    });

    // PUT: Update a doc
    app.put('/api/docs/:id', function (req, res) {
        // Doc find by its id
        Doc.findById(req.params.id, function (err, doc) {

            // Update fields if given and save the updated Doc
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

            // If Doc is published, update its rating
            if (doc.published) {
                var totalRating = 0;
                for (var i = 0; i < doc.ratings.length; i++) {
                    totalRating += doc.ratings[i].rating;
                }
                doc.rating = totalRating;
            }
            
            // If Doc is not published, update its date
            else {
                doc.date = Date.now();
            }
            
            doc.save(function (err, result) {
                if (err)
                    res.send(err);

                // If Doc update successful, populate author field
                // with (id and) alias, and return the new Doc
                result.populate("author", "alias")
                        .execPopulate().then(function (err, result) {
                    if (err)
                        res.send(err);

                    res.json(result); // Return the updated doc
                });
            });
        });
    });

    // DELETE: Delete a doc
    app.delete('/api/docs/:id', function (req, res) {
        Doc.findByIdAndRemove(req.params.id, function (err, result) {
            if (err)
                res.send(err);

            // If Doc delete successful, return id of deleted Doc
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

