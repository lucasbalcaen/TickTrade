(function (overzicht) {
    "use strict";

    overzicht.controller('statistiekcontroller', ['$scope', '$http', function($scope, $http) {
        $http.get("/api/overzichttickets").then(function (result) {
            var tickets = result.data;
            var i;

            var thisYear = new Date().getFullYear();
            var thisMonth = new Date().getMonth()+1;
            var thisDay = new Date().getDate();
            if(thisDay < 10){
                thisDay = "0"+thisDay;
            }
            if(thisMonth < 10){
                thisMonth = "0"+thisMonth;
            }

            var today = thisYear+"-"+thisMonth+"-"+thisDay;

            var gisteren = thisYear+"-"+thisMonth+"-"+(thisDay-1);
            var eergisteren = thisYear+"-"+thisMonth+"-"+(thisDay-2);
            var driegeleden = thisYear+"-"+thisMonth+"-"+(thisDay-3);
            var viergeleden = thisYear+"-"+thisMonth+"-"+(thisDay-4);
            var vijfgeleden = thisYear+"-"+thisMonth+"-"+(thisDay-5);
            var tellervandaag = 0;
            var tellergisteren = 0;
            var tellereergisteren = 0;
            var tellerdrieterug = 0;
            var tellervierterug = 0;
            var tellervijfterug = 0;

            var tellermuziekfestival = 0;
            var tellerexpo = 0;
            var museumteller = 0;
            console.log(gisteren);
            for(i=0;i<tickets.length;i++){
                var volledigeDatum = tickets[i].createdOn.substring(0,10);
                //alert(volledigeDatum);
                switch (volledigeDatum) {
                    case today:  tellervandaag++;
                        break;
                    case gisteren:  tellergisteren++;
                        break;
                    case eergisteren: tellereergisteren++;
                        break;
                    case driegeleden:  tellerdrieterug++;
                        break;
                    case viergeleden:  tellervierterug++;
                        break;
                    case vijfgeleden:  tellervijfterug++;
                        break;
                    default:
                        break;
                }

                switch(tickets[i].sort){
                    case "Music Festival": tellermuziekfestival++;
                        break;
                    case "Expo": tellerexpo++;
                        break;
                    case "Museum Ticket": museumteller++;
                        break;
                    default:
                        break;
                }
            }

            var data = {
                labels: ["5 dagen geleden", "4 dagen geleden", "3 dagen geleden", "Eergisteren", "Gisteren", "Vandaag"],
                datasets: [
                    {
                        label: "My First dataset",
                        fillColor: "rgba(248, 148, 6, 0.2)",
                        strokeColor: "rgba(248, 148, 6, 1)",
                        pointColor: "rgba(248, 148, 6, 1)",
                        pointStrokeColor: "#fff",
                        pointHighlightFill: "#fff",
                        pointHighlightStroke: "rgba(248, 148, 6, 1)",
                        data: [tellervijfterug, tellervierterug, tellerdrieterug, tellereergisteren, tellergisteren, tellervandaag]
                    }
                ]
            };

            var ctx = document.getElementById("myChart").getContext("2d");
            var myNewChart = new Chart(ctx).Line(data);

            var piedata = [
                {
                    value: museumteller,
                    color:"#f89406",
                    highlight: "#f89406",
                    label: "Museum Ticket"
                },
                {
                    value: tellerexpo,
                    color: "#2d3e50",
                    highlight: "#2d3e50",
                    label: "Expo"
                },
                {
                    value: tellermuziekfestival,
                    color: "#e74c3c",
                    highlight: "#e74c3c",
                    label: "Music Festival"
                }
            ]

            var piectx = document.getElementById("mypie").getContext("2d");
            var myDoughnutChart = new Chart(piectx).Doughnut(piedata);

    })}]);

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

})(angular.module("statistiek",[]));