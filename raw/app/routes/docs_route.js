module.exports = function (app) {
    // GET: Get all docs
    app.get('/api/docs', function (req, res) {
        Doc.find(function (err, result) {
            if (err)
                res.send(err);
            res.json(result); // Return all docs
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
            res.json({message: 'Doc, \"' + req.body.title + "\", created."});
            });
        });
    
    // PUT: Update a doc
    app.put('/api/docs/:id', function (req, res) {
        Doc.findbyId(req.params.id, function (err, result) {
            doc.title = req.body.title;
            doc.body = req.body.body;
            doc.comments = req.body.comments;
            doc.save(function (err) {
                if (err)
                    res.send(err);
                res.json({message: 'Doc, \"' + req.body.title + "\", updated."});
            });
        });
    });
};

