module.exports = function (app, Note) {
    // GET: Get notes based on doc id
    app.get('/api/notes/doc/:id', function (req, res) {
        // Notes find by given doc id, sorted by date
        Note.find({doc: req.params.id})
                .sort({'date': -1})
                .populate('author', 'alias')
                .exec(function (err, result) {
                    if (err)
                        res.send(err);
                    res.json(result); // Return notes
                });
    });

    // GET: Get note count based on doc id
    app.get('/api/notes/doc/:id/count', function (req, res) {
        Note.count({doc: req.params.id})
                .exec(function (err, result) {
                    if (err)
                        res.send(err);
                    res.json(result); // Return note count
                });
    });

    // POST: Create a note
    app.post('/api/notes', function (req, res) {
        // Create a note with given information and save the new note
        var note = new Note();
        note.author = req.body.author;
        note.doc = req.body.doc;
        note.body = req.body.body;
        note.save(function (err, result) {
            if (err)
                res.send(err);
            res.json(result); // Return created note
        });
    });
};

