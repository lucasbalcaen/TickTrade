/**
 * Created by giles on 5/01/2016.
 */
(function (onderhandel) {
    "use strict";



    onderhandel.controller('verzoekController', ['$scope', '$http', function($scope, $http) {



        var path =window.location.pathname;
        var idverzoek = path.replace("/onderhandelen/","");
        var stringticketId;
        var arrticketId=[];
        var aangebodenId=[];
        var arrTickets=[];
        var arrAlleTickets=[];


        $http({
            url:"/api/verzoekViaId",
            method:"GET",
            params:{ids:idverzoek}
        }).then(function(result){
            $scope.verzoek = result.data;
            stringticketId=result.data.ticketId;
            arrticketId = stringticketId.split(',');
            aangebodenId.push(result.data.aangebodenId);
            arrAlleTickets = aangebodenId.concat(arrticketId);

              
                $http({
                    url:"/api/ticketViaId",
                    method:"GET",
                    params:{ids:arrAlleTickets[0]}
                }).then(function(result){
                    arrTickets.push(result.data);
                    $http({
                        url:"/api/ticketViaId",
                        method:"GET",
                        params:{ids:arrAlleTickets[1]}
                    }).then(function(result){
                        arrTickets.push(result.data);
                    });
                });


            $scope.tickets = arrTickets;
            $scope.arralletickets = arrAlleTickets;

        });


        $http.get("/api/getUser").then(function (result) {
            $scope.currentUser = result.data;

            if(result.data==="") {
                $scope.loggedIn = false;
            }else{
                $scope.loggedIn = true;
            }

        });


        $scope.trade = function() {
            var socket = io.connect();
            socket.on("connect",function(){
                console.log("connected");
            });

            socket.on("disconnect",function(){
                console.log("disconnected");
            });

            var alleTickets = document.getElementById('alleTickets').value;
            var deel1 = alleTickets.replace('[','');
            var deel2 = deel1.replace(']','');
            var stukken = deel2.split(',');

            var idtickets =[];

            for( var i = 0; i<stukken.length;i++){
               var test = stukken[i].substring(2,25);

                if(i>0){
                    idtickets.push(test);
                }
            }



            var idaangeboden = stukken[0].substring(2,25);
            var userAanbieder = document.getElementById('userIdAnder').value;
            var userRuiler = document.getElementById('userIdJezelf').value;

            var msg = [idaangeboden,userAanbieder,userRuiler,idtickets];

            socket.emit("afhandelen",msg);

            //verzoek gaan verplaatsen naar andere db

                // alle2 de ids van de mensen toevoegen om dan zo in de details te tonen

                //dan verwijderen uit ruilverzoeken via id

                //de id's van alle tickets verwijderen uit de overzicht db


        }

    }]);



    onderhandel.controller('userController', ['$scope', '$http', function($scope, $http ) {
        $http.get("/api/getUser").then(function (result) {
            $scope.currentUser = result.data;

            if(result.data==="") {
                $scope.loggedIn = false;
            }else{
                $scope.loggedIn = true;
            }

        })
    }]);


})(angular.module("onderhandel",[]));