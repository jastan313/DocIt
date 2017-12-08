var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;
var objectId = Schema.ObjectId;

// Comment schema definition
var noteSchema = new Schema({
    id: {type: objectId, auto: true},
    author: {type: objectId, ref: 'User'},
    doc: {type: objectId, ref: 'Document'},
    body: {type: String, default: 'No note.'},
    date: {type: Date, default: Date.now}
});
// Apply the uniqueValidator plugin to noteSchema.
noteSchema.plugin(uniqueValidator);

// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('Note', noteSchema);