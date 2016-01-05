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

socket.on("alletickets",function(msg){
    var ticketTitle = msg[0];
    var ticketOwner = msg[1];
    var ticketAmount = msg[2];
    console.log("kom erin");
    $("#feedje").append("<div class='ui feed' id='feedui'><div class='event'><div class='label' id='ticketlabel'><i class='ticket icon'></i></div><div class='content'><div class='summary' id='feedinfo'>"+ticketOwner +" posted "+ticketAmount+" ticket(s): "+ticketTitle+"</div></div></div></div>");

});

setInterval(function(){
    if($('#feedje').children().length > 0)
    {
        setInterval(function(){
            var child = $('#feedje').children().first();
            child.remove();

        }, 15000);
    }
},1000);