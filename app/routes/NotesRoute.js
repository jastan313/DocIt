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
                    res.json(result); // Return docs
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

    // DELETE: Delete all notes based on doc id
    app.delete('/api/notes/doc/:id', function (req, res) {
        Note.deleteMany({doc: req.params.id}, function (err) {
            res.send(err);
        });
    });
};
