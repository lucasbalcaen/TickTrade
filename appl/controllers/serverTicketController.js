/**
 * Created by lucas on 9/12/2015.
 */
var Ticket = require('../models/ticket.js');
var TradedTicket = require('../models/tradedticket.js');
var ruilverzoek = require('../models/ruilverzoek.js');
exports.create = function(req,res)
{

        var entry = new Ticket({
            title: req.body.formTicketTitle,
            sort: req.body.formTicketSort,
            description: req.body.formTicketDescription,
            price: req.body.formTicketPrice,
            amount: req.body.formTicketAmount,
            owner: req.user.local.voornaam,
            user: req.user._id,
            city: req.body.formCity,
            datum:req.body.formDatum


        });

        entry.save();

        res.redirect('/');



};

exports.createVerzoek = function(req,res){
        var entry = new ruilverzoek({
            ticketId:req.body.formGeselecteerdId ,
            aangebodenId: req.body.formAangebodenId ,
            userIdAanbieder:req.body.formAanbiederId,
            bekeken: false
        });
    entry.save();
    res.redirect('/');
};

exports.getTickets = function(req,res){
    res.render('ticketregistreren', {title: 'Registreer uw ticket'});
};

exports.getLast5Tickets = function(req,res)
{
    var query = Ticket.find();
    query.sort({createdOn:'desc'})
        .limit(5)
        .exec(function(err,results){
            res.json(results)});
};

exports.getAllTickets = function(req,res){
    var query = Ticket.find();
    query.exec(function(err,results){
        res.json(results);
    });
};

exports.getMyTickets = function(req,res){
    var user = req.user._id;

    var query = Ticket.find({"user":user.toString()});
    query.exec(function(err,results){
        res.json(results);
    });


};

exports.getOneTicket = function(req,res){

    res.json(req);

  /*  var user = req.user._id;

    var query = Ticket.find({"user":user.toString()});
    query.exec(function(err,results){
        res.json(results);
    });*/
};

exports.getMyTraded = function (req, res) {
    var user = req.user.id;

    var query = TradedTicket.find({"user": user.toString()});
    query.exec(function (err, results) {
        res.json(results);
    });
};

exports.createTraded = function (req, res) {
    var entry = new TradedTicket({
        title: req.body.formTicketTitle,
        sort: req.body.formTicketSort,
        price: req.body.formTicketPrice,
        amount: req.body.formTicketAmount,
        owner: req.user.local.voornaam,
        user: req.user._id,
        title2: req.body.formTicketTitle2,
        sort2: req.body.formTicketSort2,
        price2: req.body.formTicketPrice2,
        amount2: req.body.formTicketAmount2,
        user2: req.user._id
    });

    entry.save();

    res.redirect('/');

};

exports.getVerzoeken = function(req,res){
    var user = req.user._id;
    var query = ruilverzoek.find({"userIdAanbieder":user.toString()});
    query.exec(function(err,results){
        res.json(results);
    });
};

exports.getTicketById= function(req,res){

    var ids = req.query.ids;

    var query = Ticket.findOne({_id:ids});
    query.exec(function(err,obj) {
        res.json(obj);
    });

};


exports.getVerzoekById=function(req,res){

    var ids = req.query.ids;

    var query = ruilverzoek.findOne({_id:ids});
    query.exec(function(err,obj) {
        res.json(obj);
    });



};


// deleten ******************************************************

exports.deleteVerzoek= function(req,res){
   var id = req.params.idverzoek;
    var query = ruilverzoek.remove({"_id":id});
    query.exec(function(err,results){
        res.send("deleted");
    });

};

// updaten ********************************************************

exports.accNotificatie= function(req,res){
    var id = req.params.idnotificatie;
    var query = {'_id':id};
    //return res.send("succesfully saved");

    ruilverzoek.update(query, { $set: { bekeken: true }}, {multi:true}, function(err, doc){
        if (err) return res.send(500, { error: err });
        return res.send("succesfully saved");
    });
};


