/**
 * Created by giles on 28/12/2015.
 */
(function (mytickets) {
    "use strict";

    mytickets.controller('myTicketsController', ['$scope', '$http', function($scope, $http) {
        $http.get("/api/mytickets").then(function (result) {
            $scope.mytickets = result.data;

        })
    }]);

    mytickets.controller('userController', ['$scope', '$http', function($scope, $http, $rootScope) {
        $http.get("/api/getUser").then(function (result) {
            $scope.currentUser = result.data;

            if(result.data==="") {
                $scope.loggedIn = false;
            }else{
                $scope.loggedIn = true;
            }

        })
    }]);

})(angular.module("mytickets",[]));