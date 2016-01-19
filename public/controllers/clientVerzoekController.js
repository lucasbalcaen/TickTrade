/**
 * Created by giles on 5/01/2016.
 */
(function (verzoek) {
    "use strict";



    verzoek.controller('notificatieController', ['$scope', '$http', function($scope, $http) {



        var arrayVerzoeken=[];
        var arrBekeken=[];
        var arrayTickets=[];
        var arrayId=[];
        var arrayIdverzoeken=[];
        $http.get("/api/getmyverzoeken").then(function(result){
             var verzoeken =result.data;


                $http.get("/api/overzichttickets").then(function (result2) {
                    var obj = result2.data;
                    for (var q=0;q<verzoeken.length;q++) {
                        var aangeboden = verzoeken[q].aangebodenId;
                        var arrtickets = verzoeken[q].ticketId;
                        var arrayBekeken = [];

                        var stukken = arrtickets.split(",");

                    for (var i = 0; i < obj.length; i++){
                        if (obj[i]._id == aangeboden) {
                           if(verzoeken[q].bekeken == true) {
                               arrayBekeken.push(verzoeken[q]._id);
                               arrayBekeken.push(obj[i]);
                              // arrayTickets.push(verzoeken[q]._id);
                              // arrayTickets.push(obj[i]);

                            }else {
                                arrayTickets.push(verzoeken[q]._id);
                                arrayTickets.push(obj[i]);
                            }
                        }
                    }

                    for (var y =0; y<stukken.length;y++) {
                        for (var d = 0; d < obj.length; d++) {
                            if (obj[d]._id == stukken[y]) {
                                if(verzoeken[q].bekeken == true) {
                                 //   arrayTickets.push(obj[d]);
                                    arrayBekeken.push(obj[d]);
                                }else{
                                    arrayTickets.push(obj[d]);

                                }
                            }
                        }
                    }
                        arrayVerzoeken.push(arrayTickets);
                        arrBekeken.push(arrayBekeken);
                        arrayTickets=[];
                        arrayBekeken=[]
                        arrayVerzoeken.clean("");
                        arrBekeken.clean("");

                        $scope.verzoeken = arrayVerzoeken;

                        $scope.bekeken = arrBekeken;

                        $scope.ids = arrayId;
                        $scope.idspending=arrayIdverzoeken;
                    }
                });



        });

        $scope.accept = function(id,iduser) {

            $http.get("/api/accnotificaties/"+id).then(function(result){
                window.location.href='/onderhandelen/'+id;
            });


        }

        $scope.decline = function(id) {
            $http.get("/notificaties/"+id).then(function(result){
                location.reload();
            });
        }
    }]);


    verzoek.controller('eigenNotificatieController', ['$scope', '$http', function($scope, $http) {


        //alle verzoekenophalen waar jij de mee wil ruilen

        var arrayVerzoeken=[];
        var arrBekeken=[];
        var arrayTickets=[];
        var arrayId=[];
        var arrayIdverzoeken=[];
        $http.get("/api/getEigenNotificaties").then(function(result){
            var verzoeken =result.data;


            $http.get("/api/overzichttickets").then(function (result2) {
                var obj = result2.data;
                for (var q=0;q<verzoeken.length;q++) {
                    var aangeboden = verzoeken[q].aangebodenId;
                    var arrtickets = verzoeken[q].ticketId;


                    var stukken = arrtickets.split(",");

                    for (var i = 0; i < obj.length; i++){
                        if (obj[i]._id == aangeboden) {

                                arrayTickets.push(verzoeken[q]._id);
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

                    arrayVerzoeken.clean("");


                    $scope.accepted = arrayVerzoeken;


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

    Array.prototype.clean = function(deleteValue) {
        for (var i = 0; i < this.length; i++) {
            if (this[i] == deleteValue) {
                this.splice(i, 1);
                i--;
            }
        }
        return this;
    };


})(angular.module("verzoek",[]));