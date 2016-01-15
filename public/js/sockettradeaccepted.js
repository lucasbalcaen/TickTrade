/**
 * Created by lucas on 15/01/2016.
 */
var socket = io.connect();
socket.on("connect",function(){
    console.log("connected");
    console.log(socket.id);
});

socket.on("disconnect",function(){
    console.log("disconnected");
});

socket.on("tradeaccepted",function(msg){
    var userIdVanWie = msg[0];
    var userIdNaarWie = msg[1];
    var userNaamVanWie = msg[2];
    var hiddenUserId = document.getElementById("hiddenuserid").value;
    if(hiddenUserId == userIdNaarWie)
    {
        console.log("hetzelfde");
        $('body').append("<div class='ui cards' id='notdiv'><div class='card'> <div class='content'><div class='header'><i class='user icon'></i>"+userNaamVanWie+"</div><div class='description'>"+userNaamVanWie+" has accepted your trade. Check out your notifications page to negotiate!</div></div> <div class='extra content'><a href='/notificaties'><div class='ui basic green button'>Check it out</div></a></div></div></div>");
    }
    else{
        console.log("niet hetzelfde");
    }

    //console.log("userIdVanWie "+userIdVanWie);
    //console.log("userIdNaarWie "+userIdNaarWie);
    //console.log("userNaamVanWie "+userNaamVanWie);
});

/*setInterval(function(){
    var tradeRequestNotificatie = $('#notdiv');
    {
        if(tradeRequestNotificatie){
            setInterval(function(){
                tradeRequestNotificatie.remove();
            },5000)
        }
    }
},1000);*/