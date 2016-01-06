/**
 * Created by lucas on 6/01/2016.
 */

var mongoose = require('mongoose');

var ingelogdScheme = mongoose.Schema({
    userID: String,
    userNaam: String,
});

module.exports = mongoose.model('IngelogdUser',ingelogdScheme);