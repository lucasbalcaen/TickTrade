/**
 * Created by lucas on 9/12/2015.
 */
var Ticket = require('../models/ticket.js');
var TradedTicket = require('../models/tradedticket.js');
exports.create = function(req,res)
{

        var entry = new Ticket({
            title: req.body.formTicketTitle,
            sort: req.body.formTicketSort,
            price: req.body.formTicketPrice,
            amount: req.body.formTicketAmount,
            owner: req.user.local.voornaam,
            user: req.user._id,
            city: req.body.formCity,
            datum:req.body.formDatum


        });

        entry.save();

        res.redirect('index.html');



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

    res.send(req.toString());

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

    res.redirect('index.html');

};


