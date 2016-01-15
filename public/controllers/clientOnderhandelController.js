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



            for (var i=0;i<arrAlleTickets.length;i++){
              alert("show");
                $http({
                    url:"/api/ticketViaId",
                    method:"GET",
                    params:{ids:arrAlleTickets[i]}
                }).then(function(result){
                    arrTickets.push(result.data);
                });
            }

            $scope.tickets = arrTickets;


        });






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