/**
 * Created by giles on 8/12/2015.
 */
// app/routes.js
var ticketController = require('./controllers/serverTicketController.js');
var userController = require('./controllers/serverUserController.js');


module.exports = function(app, passport) {

// alle routes voor navigatie ************************************************************


    app.get('/', function(req, res) {
        res.sendfile('./public/index.html');
    });

    app.get('/login', function(req, res) {

        res.sendfile('./public/login.html');
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

    app.get('/overzichttickets/:id',function(req,res){

        res.sendfile('./public/ticket.html');
    });

    app.get('/mytickets',function(req,res){
        res.sendfile('./public/mytickets.html');
    });

    app.get('/notificaties',function(req,res){
        res.sendfile('./public/notificaties.html');
    });

    app.get('/profile', isLoggedIn, function(req, res) {
        res.json(req.user);
    });

    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    app.get('/ticketregistreren',isLoggedIn,function(req,res){
        return ticketController.getTickets(req,res);
    });


    // alle api calls ********************************************************************

    app.get('/api/getuser', function(req,res){
        res.json(req.user);
        // return userController.getUser(req,res);
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

    app.get('/api/mytraded',function(req,res){
        return ticketController.getMyTraded(req,res);
    });


    app.get('/api/oneticket',function(req,res){
       // return ticketController.getOneTicket(req,res);
        return req.toString();
    });

    app.get('/api/getMyVerzoeken',function(req,res){
        return ticketController.getVerzoeken(req,res);
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

    app.post('/overzichttickets',function(req,res){
        return ticketController.createVerzoek(req,res);
    });


};

// kijken of de gebruiker ingelogd is *****************************************************
function isLoggedIn(req, res, next) {

    if (req.isAuthenticated())
        return next();

    // niet ingelogd, naar loginpagina
    res.redirect('/login');
}