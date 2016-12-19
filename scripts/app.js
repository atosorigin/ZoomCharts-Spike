var app = angular.module('zoomChartsApp', []);

app.controller('MainCtrl', function($scope) {

    $scope.chosenPlayer = "Hamilton Ricard";
    $scope.chosenSeason = "1995/1996";

    $scope.linkPlayer1 = "Hamilton Ricard";
    $scope.linkPlayer2 = "Hamilton Ricard";
    $scope.netChartId = 11;

    $scope.pieChartData = {
        "subvalues": [
            {
                "value": 31, "name": "Hamilton Ricard", "subvalues": [
                    { "value": 15, "name": "1998/1999", "colour" : "red" },
                    { "value": 12, "name": "1999/2000", "colour" : "yellow" },
                    { "value": 4, "name": "2000/2001", "colour" : "green" }
                ]
            },
            {
                "value": 27, "name": "Juninho", "subvalues": [
                    { "value": 2, "name": "1995/1996" },
                    { "value": 10, "name": "1996/1997" },
                    { "value": 4, "name": "1999/2000" },
                    { "value": 3, "name": "2002/2003" },
                    { "value": 8, "name": "2003/2004" }
                ]
            },
            {
                "value": 26, "name": "Mark Viduka", "subvalues": [
                    { "value": 5, "name": "2004/2005" },
                    { "value": 7, "name": "2005/2006" },
                    { "value": 14, "name": "2006/2007" }
                ]
            },
            {
                "value": 25, "name": "Yakubu", "subvalues": [
                    { "value": 13, "name": "2005/2006" },
                    { "value": 12, "name": "2006/2007" },
                    { "value": 0, "name": "2007/2008" }
                ]
            },
            {
                "value": 25, "name": "Szilard Nemeth", "subvalues": [
                    { "value": 3, "name": "2001/2002" },
                    { "value": 7, "name": "2002/2003" },
                    { "value": 9, "name": "2003/2004" },
                    { "value": 6, "name": "2004/2005" },
                    { "value": 0, "name": "2005/2006" }
                ]
            },
            {
                "value": 3, "name": "Alvaro Negredo", "subvalues": [
                    { "value": 3, "name": "2016/2017" }
                ]
            }
        ]
    };

    $scope.netChartData = {
        nodes: [
            { id: "Hamilton Ricard" },
            { id: "Juninho" },
            { id: "Mark Viduka" },
            { id: "Yakubu" },
            { id: "Szilard Nemeth" },
            { id: "Carlos Marinelli" },
            { id: "Fabrizio Ravanelli" },
            { id: "Jonathan Woodgate" },
        ],
        links: [
            { id: "hr-ju", from: "Hamilton Ricard", to: "Juninho" },
            { id: "sn-ju", from: "Szilard Nemeth", to: "Juninho" },
            { id: "yak-mv", from: "Yakubu", to: "Mark Viduka" },
            { id: "sn-mv", from: "Szilard Nemeth", to: "Mark Viduka" },
            { id: "sn-yak", from: "Szilard Nemeth", to: "Yakubu" },
            { id: "cm-sn", from: "Carlos Marinelli", to: "Szilard Nemeth" },
            { id: "cm-hr", from: "Carlos Marinelli", to: "Hamilton Ricard" },
            { id: "cm-ju", from: "Carlos Marinelli", to: "Juninho" },
            { id: "fr-ju", from: "Fabrizio Ravanelli", to: "Juninho" },
            { id: "jw-yak", from: "Jonathan Woodgate", to: "Yakubu" }
        ]
    };

    $scope.timeChartData = {
        values: [
            ["2015-12-01", 5],
            ["2015-12-08", 1],
            ["2015-12-15", 2],
            ["2015-12-22", 3],
            ["2015-12-26", 1],
            ["2015-12-28", 1],
            ["2016-01-01", 2],
            ["2016-01-08", 3],
            ["2016-01-15", 2],
            ["2016-01-22", 1],
            ["2016-02-03", 2],
            ["2016-02-15", 2],            
            ["2016-02-21", 4],
            ["2016-03-01", 2],
            ["2016-03-07", 2],
            ["2016-03-13", 1],
            ["2016-03-18", 1],
            ["2016-03-24", 3],
            ["2016-03-30", 2]
        ],
        unit: 'd'
    };

    $scope.createPieChart = function (containerName, height) {
        console.log("createPieChart - containerName " + containerName + ", height " + height);
        new PieChart({
            container: document.getElementById(containerName),
            area: { height: height },
            data: { "preloaded": $scope.pieChartData },
            slice: {
                styleFunction: function(slice, data) {
                    slice.label.text = data.name + ": " + data.value + " goals";
                    if (data.colour)
                        slice.fillColor = data.colour;
                }
            }
        });
    }; 

    $scope.createFacetChart = function (containerName, height) {
        console.log("createFacetChart - containerName " + containerName + ", height " + height);
        new FacetChart({
            container: document.getElementById(containerName),
            area: { height: height },
            data: { "preloaded": $scope.pieChartData },
            series: [
                {
                    valueLabels: {
                        enabled: true,
                        position: "aboveValue",
                        style: {
                            textStyle: {
                                font: "16pt Arial"
                            },
                            backgroundStyle: {
                                lineColor: "#ccc",
                                lineWidth: 1,
                                fillColor: "rgba(200,200,200,0.5)"
                            },
                            borderRadius: 2
                        },
                        contentsFunction: function (value) { return value.toFixed(0); }
                    }
                }
            ]
        });
    };  

    $scope.createNetChart = function (containerName, height) {
        console.log("createNetChart - containerName " + containerName + ", height " + height);
        $scope.netChart = new NetChart({
            container: document.getElementById(containerName),
            area: { height: height },
            data: { "preloaded": $scope.netChartData },
            interaction: {
                zooming: { fingers: false, wheel: false }
            },
            navigation:{
                initialNodes:["Juninho"],
                mode:"manual"
            },
            style: {
                node: {
                    fillColor: "red"
                },
                link: {
                    fillColor: "light-red"
                }
            }
        });
    };

    $scope.createTimeChart = function (containerName, height) {
        console.log("createTimeChart - containerName " + containerName + ", height " + height);
        new TimeChart({
            container: document.getElementById(containerName),
            area: { height: height },
            data: { "preloaded": $scope.timeChartData },
            interaction: {
                zooming: {
                    enabled: false,
                    click: false
                }
            },
            toolbar: {
                /** This overrides the default buttons. */
                items: [
                    {
                        label: "Export",
                        align: "right",
                        cssClass: "DVSL-bar-btn-export",
                        dropDownItems: [
                            {
                                label: "Image (PNG)",
                                onClick: function () { t.export("png"); }
                            },
                            {
                                label: "Excel (XLSX)",
                                onClick: function () { t.export("xlsx"); }
                            }
                        ]
                    }
                ]
            }
        });
    };

    $scope.createPieChart("pieChart", 370); 
    $scope.createFacetChart("facetChart", 370); 
    $scope.createNetChart("netChart", 760); 
    $scope.createTimeChart("timeChart", 740);     

    $scope.addGoal = function () {
        var name = $scope.chosenPlayer;
        var chosenSeason = $scope.chosenSeason;

        console.log("addGoals - name " + name + ", season " + chosenSeason);

        var subvalues = $scope.pieChartData.subvalues;
        
        for (var playerIndex in subvalues) {            
            var player = subvalues[playerIndex];            
            if (player.name == name) {
                player.value++;

                var seasonFound = false;
                for (var seasonIndex in player.subvalues) {                    
                    var season = player.subvalues[seasonIndex];                    
                    if (season.name == chosenSeason) {
                        season.value++;
                        seasonFound = true;
                        break;
                    }                        
                }
                if (!seasonFound)
                    player.subvalues.push({ "value": 1, "name": chosenSeason });
            }
        }
        
        $scope.createPieChart("pieChart", 370);
        $scope.createFacetChart("facetChart", 370); 
    };

    $scope.linkPlayers = function () {
        var player1 = $scope.linkPlayer1;
        var player2 = $scope.linkPlayer2;

        if (player1 == player2)
            return;

        $scope.netChartData.links.push({id: $scope.netChartId, from: player1, to: player2});
        $scope.netChartId++;

        $scope.netChart.reloadData();
    }

    $scope.years = function () {
        var years = [];
        var subvalues = $scope.pieChartData.subvalues;
        
        for (var playerIndex in subvalues) {            
            var player = subvalues[playerIndex];            
            for (var seasonIndex in player.subvalues) {                    
                var season = player.subvalues[seasonIndex];
                if (!years.includes(season.name))
                    years.push(season.name);                       
            }
        }
        years.sort();
        return years;
    }
});