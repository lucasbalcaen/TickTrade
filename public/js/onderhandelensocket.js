/**
 * Created by lucas on 18/01/2016.
 */

$( document ).ready(function() {
    console.log( "document ready!" );

    var socket = io.connect();
    socket.on("connect",function(){
        console.log("connected");
    });

    socket.on("disconnect",function(){
        console.log("disconnected");
    });

    setTimeout(
        function()
        {
            var krijgmessages = document.getElementById("idGesprek").value;
            socket.emit("getmessages",krijgmessages);

            var userIdJezelf = document.getElementById("userIdJezelf").value;
            var userIdAnder = document.getElementById("userIdAnder").value;
            var naamAnder = document.getElementById("currentUserVoornaam").value;
            var eigenID = document.getElementById("hiddenuserid").value;
            var echteID;
            console.log("userIdJezelf "+userIdJezelf);
            console.log("userIdAnder "+userIdAnder);
            console.log("naamAnder "+naamAnder);
            var ids = [userIdJezelf,userIdAnder];
            for(var i = 0; i < ids.length; i++){
                if(ids[i] == eigenID){

                }else{
                    echteID = ids[i];
                }
            }
            var msg = [eigenID,echteID,naamAnder];
            if(msg){
                socket.emit("tradenotaccept",msg);
                //console.log("de shit is verstuurd");
            }
        }, 2000);

    $("#typeit").keypress(function(event) {
        if (event.which == 13) {
            var tekst = document.getElementById("typeit").value;
            if(tekst){
                var verzender = document.getElementById("currentUserVoornaam").value;
                var chatroomID = document.getElementById("idGesprek").value;
                var msg = [tekst,verzender,chatroomID];
                if(msg){
                    socket.emit("typeit",msg);
                    $("#messages").append('<div class="verzonden"><p class="tekstv">'+'You: ' +msg[0]+'</p></div>');
                    document.getElementById("typeit").value = "";
                    var element = document.getElementById("messages");
                    element.scrollTop = element.scrollHeight;
                }
            }
        }
    });

    $( "#sendit" ).click(function() {
        var tekst = document.getElementById("typeit").value;
        if(tekst){
            var verzender = document.getElementById("currentUserVoornaam").value;
            var chatroomID = document.getElementById("idGesprek").value;
            var msg = [tekst,verzender,chatroomID];
            if(msg){
                socket.emit("typeit",msg);
                $("#messages").append('<div class="verzonden"><p class="tekstv">'+'You: ' +msg[0]+'</p></div>');
                document.getElementById("typeit").value = "";
                var element = document.getElementById("messages");
                element.scrollTop = element.scrollHeight;
            }
        }


    });

    socket.on("messages",function(msg){
        $("#messages").append('<div class="ontvangen"><p class="tekstp">'+msg[1]+': '+msg[0]+'</p></div>');
        var element = document.getElementById("messages");
        element.scrollTop = element.scrollHeight;
    });
});

