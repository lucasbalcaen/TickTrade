/**
 * Created by giles on 30/12/2015.
 */
(function (oneticket) {
    "use strict";

    console.log("yeeps");

    oneticket.controller('oneTicketController', ['$scope', '$http', '$routeParams', function($scope, $http,$routeParams) {


        $http.get("/api/tickets").then(function (result) {
           var obj = result.data;
          var path =window.location.pathname;
            var needle = path.replace("/overzichttickets/","");


            for (var i = 0; i < obj.length; i++){

                if (obj[i]._id == needle){

                    $scope.ticketje=obj[i];

                    var city = obj[i].city;

                    $http.get("https://maps.googleapis.com/maps/api/geocode/json?address="+city+"&key=AIzaSyCvO-U5oFfCuHIpssuoHkixKpoIalS-cdI").then(function (result) {
                        var obj = result.data;
                        console.log(obj);

                        var olat = obj.results[0].geometry.location.lat;
                        var olng = obj.results[0].geometry.location.lng;
                         var location = {lat:olat, lng: olng};
                        // Create a map object and specify the DOM element for display.
                        var map = new google.maps.Map(document.getElementById('map'), {
                            center: location,
                            scrollwheel: false,
                            zoom: 8
                        });

                        var marker = new google.maps.Marker({
                            position: location,
                            map: map,
                            title: city.toString()
                        });

                    });
                }
            }


        })
    }]);



    oneticket.controller('userController', ['$scope', '$http', function($scope, $http ) {
        $http.get("/api/getUser").then(function (result) {
            $scope.currentUser = result.data;

            if(result.data==="") {
                $scope.loggedIn = false;
            }else{
                $scope.loggedIn = true;
            }

        })
    }]);






})(angular.module("oneticket",['ngRoute']));