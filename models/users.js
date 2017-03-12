var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');
var Task = require('./taskLists');

var User = new Schema({
    username: {
    	type: String,
    	required: true
    },
    email: {
    	type: String,
    	required: true
    },
    first_name: String,
    last_name: String,
    tasks:[{
        type: Schema.Types.ObjectId,
        ref: 'Task'
    }]
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);