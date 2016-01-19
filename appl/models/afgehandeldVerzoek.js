/**
 * Created by giles on 19/01/2016.
 */


var mongoose = require('mongoose');

var afgehandeldScheme = mongoose.Schema({
    ticketId: String,
    aangebodenId: String,
    userIdAanbieder:String,
    ruilerId:String

});

module.exports = mongoose.model('Afgehandeld',afgehandeldScheme);