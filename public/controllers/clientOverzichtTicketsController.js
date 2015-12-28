/**
 * Created by lucas on 28/12/2015.
 */
(function (overzicht) {
    "use strict";

    overzicht.controller('alleTicketsInOverzichtController', ['$scope', '$http', function($scope, $http) {
        $http.get("/api/overzichttickets").then(function (result) {
            $scope.overzichttickets = result.data;

            $scope.colourIncludes = [];

            $scope.includeSort = function(sort) {
                var i = $.inArray(sort, $scope.colourIncludes);
                if (i > -1) {
                    $scope.colourIncludes.splice(i, 1);
                } else {
                    $scope.colourIncludes.push(sort);
                }
            }

            $scope.sortFilter = function(overzichttickets) {
                if ($scope.colourIncludes.length > 0) {
                    if ($.inArray(overzichttickets.sort, $scope.colourIncludes) < 0)
                        return;
                }

                return overzichttickets;
            }

        });


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