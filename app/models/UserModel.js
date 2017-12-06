var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;
var objectId = Schema.ObjectId;

// User schema definition
var userSchema = new Schema({
    _id: {type: objectId, auto: true},
    alias: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    
    // The number of consecutive, unsuccessful login attempts
    login_attempts: {type: Number, default: 0, min: 0, max: 5},
});
// Apply the uniqueValidator plugin to userSchema.
userSchema.plugin(uniqueValidator);

// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('User', userSchema);