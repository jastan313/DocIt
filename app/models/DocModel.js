var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;
var objectId = Schema.ObjectId;

// Doc schema definition
var docSchema = new Schema({
    _id: {type: objectId, auto: true},
    author: {type: objectId, ref: 'User'},
    date: {type: Date, default: new Date()},
    title: {type: String, default: 'Untitled'},
    body: {type: String, default: ''},
    published: {type: Boolean, default: false},
    rating: {type: Number, default: 0},
    ratings: [{user_id: {type: objectId, ref: 'User'}, rating: {type: Number, default: 0}}]
});

// Middleware to update Doc's net rating and last-updated date
docSchema.post('save', function (next) {
    var totalRating = 0;
    for (var i = 0; i < this.ratings.length; i++) {
        totalRating += this.ratings[i].rating;
    }
    this.rating = totalRating;
    
    // If Doc is not published, update its date
    if (!this.published) {
        this.date = Date.now();
    }
    this.save();
});

// Apply the uniqueValidator plugin to docSchema.
docSchema.plugin(uniqueValidator);

// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('Doc', docSchema);