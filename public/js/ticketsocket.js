/**
 * Created by lucas on 7/01/2016.
 */

var socket = io.connect();
socket.on("connect",function(){
    console.log("connected");
});

socket.on("disconnect",function(){
    console.log("disconnected");
});

document.getElementById("btnTrade").addEventListener("click",function(evt){

    var ticketSellerID = document.getElementById("formAanbiederId").value;
    var ticketEigenID = document.getElementById("eigenID").value;
    var ticketEigenNaam = document.getElementById("eigenNaam").value;
    console.log("ticketSellerID "+ticketSellerID);
    console.log("ticketEigenID "+ticketEigenID);
    console.log("ticketEigeNaam "+ticketEigenNaam);
    var msg = [ticketSellerID,ticketEigenID,ticketEigenNaam];
    if(msg){
        socket.emit("traderequest",msg);
    }
},false);
