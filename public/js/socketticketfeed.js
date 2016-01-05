/**
 * Created by lucas on 5/01/2016.
 */
var socket = io.connect();
socket.on("connect",function(){
    console.log("connected");
});

socket.on("disconnect",function(){
    console.log("disconnected");
});

document.getElementById("btnSaveTicket").addEventListener("click",function(evt){
    var ticketTitle = document.getElementById("formTicketTitle").value;
    var ticketSeller = document.getElementById("hiddenuser").value;
    var ticketAmount = document.getElementById("formTicketAmount").value;
    var msg = [ticketTitle,ticketSeller,ticketAmount];
    if(msg){
        socket.emit("nieuwticketje",msg);
    }
},false);