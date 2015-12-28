/**
 * Created by lucas on 9/12/2015.
 */
var Ticket = require('../models/ticket.js');

exports.create = function(req,res)
{
    var entry = new Ticket({
        title: req.body.formTicketTitle,
        sort: req.body.formTicketSort,
        price: req.body.formTicketPrice,
        amount: req.body.formTicketAmount,
        owner: req.body.formTicketOwner
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


