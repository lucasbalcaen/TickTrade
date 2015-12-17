/**
 * Created by lucas on 9/12/2015.
 */

(function () {
    "use strict";

    var app = angular.module("app", []);

    console.log("Ik kom in mijn client Ticket Controller");

    var ticketController = function ticketController($scope,$http){

        $http.get('/api/tickets').success(function(data){
            $scope.tickets = data;
        });
    };

    angular.module("app")
        .controller("ticketController", ["$scope", "$http", ticketController]);

})();