/**
 * Created by lucas on 28/12/2015.
 */
(function (overzicht) {
    "use strict";

    overzicht.controller('alleTicketsInOverzichtController', ['$scope', '$http', function($scope, $http) {
        $http.get("/api/overzichttickets").then(function (result) {
            $scope.overzichttickets = result.data;

        })
    }]);

    overzicht.controller('userController', ['$scope', '$http', function($scope, $http, $rootScope) {
        $http.get("/api/getUser").then(function (result) {
            $scope.currentUser = result.data;

            if(result.data==="") {
                $scope.loggedIn = false;
            }else{
                $scope.loggedIn = true;
            }

        })
    }]);

})(angular.module("overzicht",[]));