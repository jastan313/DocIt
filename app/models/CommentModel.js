// grab the mongoose module
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;
var objectId = Schema.ObjectId;

// define comment schema
var commentSchema = new Schema({
    id: {type: objectId, auto: true},
    author: {type: objectId, ref: 'User'},
    document: {type: objectId, ref: 'Document'},
    text: {type: String, default: ''},
    date: {type: Date, default: Date.now}
});
// Apply the uniqueValidator plugin to commentSchema.
commentSchema.plugin(uniqueValidator);

// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('Comment', commentSchema);