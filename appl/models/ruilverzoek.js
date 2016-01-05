/**
 * Created by giles on 4/01/2016.
 */
var mongoose = require('mongoose');

var verzoekScheme = mongoose.Schema({
    ticketId: String,
    aangebodenId: String,
    userIdAanbieder:String,
    bekeken: Boolean
});

module.exports = mongoose.model('Ruilverzoek',verzoekScheme);