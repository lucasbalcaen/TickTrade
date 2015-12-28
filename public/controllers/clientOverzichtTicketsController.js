/**
 * Created by lucas on 28/12/2015.
 */
(function (overzicht) {
    "use strict";

    overzicht.controller('alleTicketsInOverzichtController', ['$scope', '$http', function($scope, $http) {
        $http.get("//api/overzichttickets").then(function (result) {
            $scope.overzichttickets = result.data;

        })
    }]);

})(angular.module("overzicht", ['']));