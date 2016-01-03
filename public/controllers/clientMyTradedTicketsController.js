/**
 * Created by lucas on 30/12/2015.
 */
(function (mytraded) {
    "use strict";

    mytraded.controller('myTradedController', ['$scope', '$http', function($scope, $http) {
        $http.get("/api/mytraded").then(function (result) {
            $scope.mytraded = result.data;

        })
    }]);

    mytraded.controller('userController', ['$scope', '$http', function($scope, $http, $rootScope) {
        $http.get("/api/getUser").then(function (result) {
            $scope.currentUser = result.data;

            if(result.data==="") {
                $scope.loggedIn = false;
            }else{
                $scope.loggedIn = true;
            }

        })
    }]);

})(angular.module("mytraded",[]));