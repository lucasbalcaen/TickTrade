/**
 * Created by lucas on 9/12/2015.
 */

var mongoose = require('mongoose');

var ticketScheme = mongoose.Schema({
    title: String,
    sort: String,
    description: String,
    price: String,
    amount: String,
    owner: String,
    user: String,
    city: String,
    datum:String,
    createdOn: {type:Date,default:Date.now}

});

module.exports = mongoose.model('Ticket',ticketScheme);