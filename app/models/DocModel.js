// grab the mongoose module
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;
var objectId = Schema.ObjectId;

// define document schema
var docSchema = new Schema({
    _id: {type: objectId, auto: true},
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    date: {type: Date, default: Date.now},
    title: {type: String, default: 'Untitled'},
    body: {type: String, default: ''},
    published: {type: Boolean, default: false},
    rating: {type: Number, default: 0},
    ratings: [{user_id: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}, rating: {type: Number, default: 0}}],
    comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}]
});

docSchema.post('save', function (next) {
   var totalRating = 0;
   for(var i = 0; i < ratings.length; i++) {
       totalRating += this.ratings[i].rating;
   }
   this.rating = totalRating;
   this.date = new Date.now();
});

docSchema.post('update', function (next) {
   var totalRating = 0;
   for(var i = 0; i < ratings.length; i++) {
       totalRating += this.ratings[i].rating;
   }
   this.rating = totalRating;
   this.date = Date.now();
});

// Apply the uniqueValidator plugin to docSchema.
docSchema.plugin(uniqueValidator);

// module.exports allows us to pass this to other files when it is called
module.exports = mongoose.model('Doc', docSchema);