/**
 * Created by lucas on 7/01/2016.
 */
var socket = io.connect();
socket.on("connect",function(){
    console.log("connected");
    console.log(socket.id);
});

socket.on("disconnect",function(){
    console.log("disconnected");
});

socket.on("testtraderequest",function(msg){
    var ticketEigenNaam = msg[0];
    var ticketSellerID = msg[1];
    var hiddenUserId = document.getElementById("hiddenuserid").value;
    if(hiddenUserId == ticketSellerID)
    {
        $('body').append("<div class='ui cards' id='notdiv'><div class='card'> <div class='content'><div class='header'><i class='user icon'></i>"+ticketEigenNaam+"</div><div class='description'>"+ticketEigenNaam+" requested to trade a ticket with you.</div></div> <div class='extra content'><a href='/notificaties'><div class='ui basic green button'>Check it out</div></a></div></div></div>");
    }
});

setInterval(function(){
    var tradeRequestNotificatie = $('#notdiv');
    {
        if(tradeRequestNotificatie){
            setInterval(function(){
                tradeRequestNotificatie.remove();
            },5000)
        }
    }
},1000);