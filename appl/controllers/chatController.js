/**
 * Created by lucas on 18/01/2016.
 */
var Chat = require('../models/chat.js');

exports.create = function(tekst,afzender,chatID)
{

    var entry = new Chat({
        tekst: tekst,
        afzender: afzender,
        chatID: chatID
    });

    entry.save();

};

