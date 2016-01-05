/**
 * Created by giles on 5/01/2016.
 */
(function (verzoek) {
    "use strict";



    verzoek.controller('notificatieController', ['$scope', '$http', function($scope, $http) {



        var arrayVerzoeken=[];
        var arrayTickets=[];
        $http.get("/api/getmyverzoeken").then(function(result){
             var verzoeken =result.data;


                $http.get("/api/overzichttickets").then(function (result2) {
                    var obj = result2.data;


                    for (var q=0;q<verzoeken.length;q++) {
                        var aangeboden = verzoeken[q].aangebodenId;
                        var arrtickets = verzoeken[q].ticketId;
                        var stukken = arrtickets.split(",");


                    for (var i = 0; i < obj.length; i++){

                        if (obj[i]._id == aangeboden) {

                           arrayTickets.push(obj[i]);
                        }
                    }

                    for (var y =0; y<stukken.length;y++) {

                        for (var d = 0; d < obj.length; d++) {


                            if (obj[d]._id == stukken[y]) {

                                arrayTickets.push(obj[d]);

                            }
                        }
                    }
                        arrayVerzoeken.push(arrayTickets);
                        arrayTickets=[];


                        $scope.verzoeken = arrayVerzoeken;
                    }
                });



        });


    }]);



    verzoek.controller('userController', ['$scope', '$http', function($scope, $http ) {
        $http.get("/api/getUser").then(function (result) {
            $scope.currentUser = result.data;

            if(result.data==="") {
                $scope.loggedIn = false;
            }else{
                $scope.loggedIn = true;
            }

        })
    }]);


})(angular.module("verzoek",[]));