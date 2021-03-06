/**
 * Created by giles on 8/12/2015.
 */
// app/routes.js
var ticketController = require('./controllers/serverTicketController.js');
var userController = require('./controllers/serverUserController.js');
var ingelogdeUserController = require('./controllers/ingelogdeUserController.js');

module.exports = function(app, passport) {

// alle routes voor navigatie ************************************************************


    app.get('/', function(req, res) {
        res.sendfile('./public/index.html');
    });

    app.get('/login', function(req, res) {

        res.sendfile('./public/login.html');
    });

    app.get('/statistiek',isLoggedIn, isAdmin, function(req, res) {
        res.sendfile('./public/statistiek.html');
    });

    app.get('/signup', function(req, res) {
        res.sendfile('./public/register.html');
    });

    app.get('/werking', isLoggedIn ,function(req, res) {

        res.sendfile('./public/werking.html');
    });

    app.get('/ticketregistreren',isLoggedIn, function(req, res) {
        res.sendfile('./public/ticketregistreren.html');
    });

    app.get('/overzichttickets',function(req,res){
        res.sendfile('./public/overzichttickets.html');
    });

    app.get('/overzichttickets/:id',isLoggedIn,function(req,res){

        res.sendfile('./public/ticket.html');
    });

    app.get('/mytickets',isLoggedIn,function(req,res){
        res.sendfile('./public/mytickets.html');
    });

    app.get('/mytraded',isLoggedIn,function(req,res){
        res.sendfile('./public/mytraded.html');
    });

    app.get('/notificaties',isLoggedIn,function(req,res){
        res.sendfile('./public/notificaties.html');
    });

    app.get('/profile', isLoggedIn, function(req, res) {
        res.json(req.user);
    });

    app.get('/logout', function(req, res) {
        var userID = req.user.id;
        req.logout();
        res.redirect('/');
        return ingelogdeUserController.delete(req,res,userID);
    });

    app.get('/ticketregistreren',isLoggedIn,function(req,res){
        return ticketController.getTickets(req,res);
    });

    app.get('/onderhandelen/:idverzoek',function(req,res){
        res.sendfile('./public/onderhandelen.html');
    });


    // alle api calls ********************************************************************

    app.get('/api/getuser', function(req,res){
        res.json(req.user);
        console.log("de user zijn id" + req.user.id);
        var userID = req.user.id;
        return ingelogdeUserController.create(req,res,userID);
    });

    app.get('/api/tickets',function(req,res){
        return ticketController.getLast5Tickets(req,res);
    });

    app.get('/api/overzichttickets',function(req,res){
        return ticketController.getAllTickets(req,res);
    });

    app.get('/api/mytickets',function(req,res){
        return ticketController.getMyTickets(req,res);
    });

    app.get('/api/getmyverzoeken',function(req,res){
        return ticketController.getVerzoeken(req,res);
    });

    app.get('/api/mytraded',function(req,res){
        return ticketController.getMyTraded(req,res);
    });

    app.get('/api/mytraded2',function(req,res){
        return ticketController.getMyTraded2(req,res);
    });


    app.get('/api/oneticket',function(req,res){
       // return ticketController.getOneTicket(req,res);
        return req.toString();
    });

    app.get('/api/ticketViaId',function(req,res){

       return ticketController.getTicketById(req,res);

    });

    app.get('/api/verzoekViaId',function(req,res){


        return ticketController.getVerzoekById(req,res);
    });

    app.get('/api/accnotificaties/:idnotificatie',function(req,res){
        return ticketController.accNotificatie(req,res);
    });

    app.get('/api/getEigenNotificaties',function(req,res){
        return ticketController.getEigenMeldingen(req,res);
    });



    // alle posts in de nav *******************************************************************

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : 'index.html', // redirect to the secure profile section
        failureRedirect : 'register.html', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/', // redirect to the secure profile section
        failureRedirect : 'login.html', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    app.post('/ticketregistreren',function(req,res){
        return ticketController.create(req,res);
    });

    app.post('/notificatietoevoegen',function(req,res){
        return ticketController.createVerzoek(req,res);
    });

// alle api deletes ***********************************************************************

    app.get('/notificaties/:idverzoek',function(req,res){
        return ticketController.deleteVerzoek(req,res)
    });



}


// kijken of de gebruiker ingelogd is *****************************************************
function isLoggedIn(req, res, next) {

    if (req.isAuthenticated())
        return next();

    // niet ingelogd, naar loginpagina
    res.redirect('/login');
}

function isAdmin(req,res,next){
    if(req.user._id == "569d08172158f438154d6c5e"){
        return next();
    }else{
        res.redirect('/');
    }
}