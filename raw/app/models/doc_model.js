// grab the mongoose module
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;
var objectId = Schema.ObjectId;

// define document schema
var docSchema = new Schema({
    id: objectId,
    author: {type: String, ref: 'User'},
    date: {type: Date, default: Date.now},
    title: {type: String, default: 'Untitled'},
    body: {type: String, default: ''},
    ratings: [[{type: mongoose.Schema.Types.ObjectId, ref: 'User'}, {type: Number, 'vote': 1}]],
    comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}]
});
// Apply the uniqueValidator plugin to docSchema.
docSchema.plugin(uniqueValidator);

// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('Doc', docSchema);