/**
 * Created by lucas on 18/01/2016.
 */

var mongoose = require('mongoose');

var chatScheme = mongoose.Schema({
    tekst: String,
    afzender: String,
    chatID: String,
    createdOn: {type:Date,default:Date.now}
});

module.exports = mongoose.model('Chat',chatScheme);