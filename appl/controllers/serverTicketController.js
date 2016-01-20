/**
 * Created by lucas on 9/12/2015.
 */
var Ticket = require('../models/ticket.js');
var TradedTicket = require('../models/tradedticket.js');
var ruilverzoek = require('../models/ruilverzoek.js');
var afhandelen = require('../models/afgehandeldVerzoek.js');
exports.create = function(req,res)
{

        var entry = new Ticket({
            title: req.body.formTicketTitle,
            sort: req.body.formTicketSort,
            description: req.body.formTicketDescription,
            price: req.body.formTicketPrice,
            amount: "1",
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
            RuilerId:req.body.formRuilerId,
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

exports.getMyTraded2 = function (req, res) {
    var user = req.user.id;

    var query = TradedTicket.find({"user2": user.toString()});
    query.exec(function (err, results) {
        res.json(results);
    });
};

exports.createAfgehandeld = function(idaangeboden,userAanbieder,userRuiler,idTickets){
    var entry = new afhandelen({
        ticketId: idTickets,
        aangebodenId: idaangeboden,
        userIdAanbieder:userAanbieder,
        ruilerId:userRuiler
    });

    entry.save();

    var id2 = idaangeboden;
    console.log("ID2 IS "+id2);
    var query = Ticket.remove({"_id":id2});
    query.exec(function(err,results){
        console.log("HIJ IS GEDELETED")
    });

    var id3 = idTickets;
    console.log("ID3 IS "+id3);
    var query2 = Ticket.remove({"_id":id3});
    query2.exec(function(err,results){
        console.log("HIJ IS GEDELETED")
    });

};


exports.createTraded = function (eigenTicketOwner,eigenTicketTitle,eigenTicketSort,eigenTicketDescription,eigenTicketAmount,eigenTicketPrice,eigenTicketCity,anderTicketOwner,anderTicketTitle,anderTicketSort,anderTicketDescription,anderTicketAmount,anderTicketPrice,anderTicketCity,eigenTicketUser,anderTicketUser) {
    /*console.log("eigenTicketOwner "+eigenTicketOwner);
    console.log("eigenTicketTitle "+eigenTicketTitle);
    console.log("eigenTicketSort "+eigenTicketSort);
    console.log("eigenTicketDescription "+eigenTicketDescription);
    console.log("eigenTicketAmount "+eigenTicketAmount);
    console.log("eigenTicketPrice "+eigenTicketPrice);
    console.log("eigenTicketCity "+eigenTicketCity);
    console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
    console.log("anderTicketOwner "+anderTicketOwner);
    console.log("anderTicketTitle "+anderTicketTitle);
    console.log("anderTicketSort "+anderTicketSort);
    console.log("anderTicketDescription "+anderTicketDescription);
    console.log("anderTicketAmount "+anderTicketAmount);
    console.log("anderTicketPrice "+anderTicketPrice);
    console.log("anderTicketCity "+anderTicketCity);*/

    var entry = new TradedTicket({
        title: eigenTicketTitle,
        sort: eigenTicketSort,
        description: eigenTicketDescription,
        price: eigenTicketPrice,
        amount: eigenTicketAmount,
        owner: eigenTicketOwner,
        user: eigenTicketUser,
        city: eigenTicketCity,
        title2: anderTicketTitle,
        sort2: anderTicketSort,
        description2: anderTicketDescription,
        price2: anderTicketPrice,
        amount2: anderTicketAmount,
        owner2: anderTicketOwner,
        user2: anderTicketUser,
        city2: anderTicketCity

    });

    entry.save();

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

exports.getEigenMeldingen=function(req,res){

    var user = req.user._id;

    var query = ruilverzoek.find({RuilerId:user, bekeken:true});
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


