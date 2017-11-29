module.exports = function (app, Comment) {
    // GET: Get all comments
    app.get('/api/comments', function (req, res) {
        Comment.find(function (err, result) {
            if (err)
                res.send(err);
            res.json(result); // Return all comments
        });
    });

    // GET: Get a specific comment
    app.get('/api/comments/:id', function (req, res) {
        Comment.findById(req.params.id, function (err, result) {
            if (err)
                res.send(err);
            res.json(result); // Return the specific comment
        });
    });

    // POST: Create a comment
    app.post('/api/comments', function (req, res) {
        var comment = new Comment();
        comment.author = req.body.user_id;
        comment.document = req.body.document_id;
        comment.text = req.body.text;
        comment.save(function (err, result) {
            if (err)
                res.send(err);
            res.json(result); // Return created comment
        });
    });

    // PUT: Update a comment
    app.put('/api/comments/:id', function (req, res) {
        Comment.findById(req.params.id, function (err, result) {
            comment.text = req.body.text;
            comment.save(function (err, result) {
                if (err)
                    res.send(err);
                res.json(result); // Return updated comment
            });
        });
    });

    // DELETE: Delete a comment
    app.delete('/api/comments/:id', function (req, res) {
        Comment.remove(req.params.id, function (err, result) {
            if (err)
                res.send(err);
            res.json(result); // Return deleted comment
        });
    });
};

