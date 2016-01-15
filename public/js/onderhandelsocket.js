/**
 * Created by lucas on 15/01/2016.
 */
window.onload = function () {
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
                var userIdJezelf = document.getElementById("userIdJezelf").value;
                var userIdAnder = document.getElementById("userIdAnder").value;
                var naamAnder = document.getElementById("naamJezelf").value;
                console.log("userIdJezelf "+userIdJezelf);
                console.log("userIdAnder "+userIdAnder);
                console.log("naamJezelf "+naamAnder);
                var msg = [userIdJezelf,userIdAnder,naamAnder];
                if(msg){
                    socket.emit("tradenotaccept",msg);
                    console.log("de shit is verstuurd");
                }
            }, 2000);

    }

