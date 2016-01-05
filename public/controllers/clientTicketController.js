/**
 * Created by giles on 9/12/2015.
 */

(function (app) {
    "use strict";



    console.log("Ik kom in mijn client Ticket Controller");

    var ticketController = function ticketController($scope,$http){

        $http.get('/api/tickets').success(function(data){
            $scope.tickets = data;
        });
    };



    app.controller('userController', ['$scope', '$http', function($scope, $http, $rootScope) {
        $http.get("/api/getUser").then(function (result) {
            $scope.currentUser = result.data;

            if(result.data==="") {
                $scope.loggedIn = false;
            }else{
                $scope.loggedIn = true;
            }

        })
    }]);


    app.controller('ticketController',["$scope","$http",ticketController]) ;



})(angular.module("app", []));