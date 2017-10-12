// grab the mongoose module
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;
var objectId = Schema.ObjectId;

// define user schema
var userSchema = new Schema({
    id: objectId,
    account: {
        username: {type: String, unique: true},
        password: String,
        required: true
    },
    documents: [{type: Schema.Types.ObjectId, ref: 'Doc'}],
    comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
});
// Apply the uniqueValidator plugin to userSchema.
userSchema.plugin(uniqueValidator);

// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('User', userSchema);