/**
 * Created by lucas on 30/12/2015.
 */


var mongoose = require('mongoose');

var tradedScheme = mongoose.Schema({
    title: String,
    sort: String,
    price: String,
    amount: String,
    owner: String,
    user: String,
    tradedOn: {type:Date,default:Date.now},
    title2: String,
    sort2: String,
    price2: String,
    amount2: String,
    owner2: String,
    user2: String,
    tradedOn2: {type:Date,default:Date.now}

});

module.exports = mongoose.model('Tradedticket',tradedScheme);