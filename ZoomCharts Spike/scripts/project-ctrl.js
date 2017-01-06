var app = angular.module('zoomChartsApp', []);

app.controller('ProjectsCtrl', function($scope) {

    $scope.projects = [{
            'name' : 'Project 1',
            'people' : [{
                    'name' : 'Jonathan M'
                }, {
                    'name' : 'Dave A'
                }, {
                    'name' : 'Claire C'
                }, {
                    'name' : 'Eric K'
                }, {
                    'name' : 'Frank H'
                }
            ]
        }, {
            'name' : 'Project 2',
            'people' : [{
                    'name' : 'Dave A'
                }, {
                    'name' : 'Claire C'
                }, {
                    'name' : 'Martin Y'
                }, {
                    'name' : 'Graham J'
                }, {
                    'name' : 'Eric K'
                }
            ]
        }, {
            'name' : 'Project 3',
            'people' : [{
                    'name' : 'Jonathan M'
                }, {
                    'name' : 'Dave A'
                }, {
                    'name' : 'Martin Y'
                }, {
                    'name' : 'Eric K'
                }, {
                    'name' : 'Joanne J'
                }
            ]
        }, {
            'name' : 'Project 4',
            'people' : [{
                    'name' : 'Claire C'
                }, {
                    'name' : 'Phil G'
                }, {
                    'name' : 'Graham J'
                }, {
                    'name' : 'Eric K'
                }, {
                    'name' : 'Joanne J'
                }
            ]
        }, {
            'name' : 'Project 5',
            'people' : [{
                    'name' : 'Jonathan M'
                }, {
                    'name' : 'Dave A'
                }, {
                    'name' : 'Martin Y'
                }, {
                    'name' : 'Graham J'
                }, {
                    'name' : 'Frank H'
                }
            ]
        }, {
            'name' : 'Project 6',
            'people' : [{
                    'name' : 'Phil G'
                }, {
                    'name' : 'Bob G'
                }, {
                    'name' : 'Martin Y'
                }, {
                    'name' : 'Eric K'
                }, {
                    'name' : 'Frank H'
                }
            ]
        }, {
            'name' : 'Project 7',
            'people' : [{
                    'name' : 'Jonathan M'
                }, {
                    'name' : 'Claire C'
                }, {
                    'name' : 'Eric K'
                }, {
                    'name' : 'Joanne J'
                }, {
                    'name' : 'Harry H'
                }
            ]
        }, {
            'name' : 'Project 8',
            'people' : [{
                    'name' : 'Jonathan M'
                }, {
                    'name' : 'Martin Y'
                }, {
                    'name' : 'Graham J'
                }, {
                    'name' : 'Frank H'
                }, {
                    'name' : 'Harry H'
                }
            ]
        }, {
            'name' : 'Project 9',
            'people' : [{
                    'name' : 'Phil G'
                }, {
                    'name' : 'Martin Y'
                }, {
                    'name' : 'Graham J'
                }, {
                    'name' : 'Frank H'
                }, {
                    'name' : 'Joanne J'
                }
            ]
        }, {
            'name' : 'Project 10',
            'people' : [{
                    'name' : 'Phil G'
                }, {
                    'name' : 'Graham J'
                }, {
                    'name' : 'Eric K'
                }, {
                    'name' : 'Frank H'
                }, {
                    'name' : 'Harry H'
                }
            ]
        }
    ];

    $scope.initialiseNetChartData = function () {
        $scope.netChartData = {
            nodes: [            
            ],
            links: [            
            ]
        };
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
                initialNodes:[$scope.initialNode],
                mode:"manual"
            },
            events:{
                onClick:$scope.selectNode
            },
            style:{
                nodeStyleFunction: function(node) {
                    if (node.data.type == 'PERSON')
                        node.fillColor = "red";
                    if (node.data.type == 'PROJECT')
                        node.fillColor = "blue";
                }
            }
        });
    };

    $scope.createFocusNetChart = function (containerName, height) {
        console.log("createFocusNetChart - containerName " + containerName + ", height " + height);
        $scope.netChart = new NetChart({
            container: document.getElementById(containerName),
            area: { height: height },
            data: { "preloaded": $scope.netChartData },
            interaction: {
                zooming: { fingers: false, wheel: false }
            },
            navigation: {
                initialNodes:[$scope.initialNode],
                focusNodeExpansionRadius: 2,
                numberOfFocusNodes: 1,
                mode:"focusnodes"
            },
            style:{
                nodeStyleFunction: function(node) {
                    if (node.data.type == 'PERSON')
                        node.fillColor = "red";
                    if (node.data.type == 'PROJECT')
                        node.fillColor = "blue";
                }
            }
        });
    };

    $scope.selectProject = function () {
        console.log("selectProject - project " + $scope.chosenProject);
        if (!$scope.chosenProject)
            return;        
        $scope.initialiseNetChartData();
        var p = JSON.parse($scope.chosenProject);

        // create nodes of type { id: "" }
        $scope.netChartData.nodes.push({ id: p.name, type: "PROJECT" });
        for (var personIndex in p.people) {
            var person = p.people[personIndex];
            $scope.netChartData.nodes.push({ id: person.name, type: "PERSON" });
        }        
        $scope.initialNode = p.name;
        $scope.createNetChart("netChart", 760); 
    }

    $scope.selectProjectFocusMode = function () {
        console.log("selectProjectFocusMode - project " + $scope.chosenProject);
        if (!$scope.chosenProject)
            return;        
        $scope.initialiseNetChartData();

        for (var pIndex in $scope.projects) {
            var p = $scope.projects[pIndex];
            // create nodes of type { id: "" }
            $scope.netChartData.nodes.push({ id: p.name, type: "PROJECT" });
            for (var personIndex in p.people) {
                var person = p.people[personIndex];
                if (!$scope.containsNodeFocusMode(person.name))
                    $scope.netChartData.nodes.push({ id: person.name, type: "PERSON" });
                if (!$scope.containsLinkFocusMode(p.name, person.name))
                    $scope.netChartData.links.push({ from: p.name, to: person.name });
            }
        }
                
        $scope.initialNode = JSON.parse($scope.chosenProject).name;
        $scope.createFocusNetChart("netChart", 760); 
    }

    $scope.selectNode = function (event) {
        if (!event.clickNode)
            return;
        console.log("selectNode");
        console.log(event.clickNode.data);

        var nodesToAdd = [];
        var linksToAdd = [];
        var node = event.clickNode.data;

        if (node.type == 'PERSON') {
            for (var projectIndex in $scope.projects) {
                var project = $scope.projects[projectIndex];
                for (var personIndex in project.people) {
                    var person = project.people[personIndex];
                    if (person.name == node.id) {
                        if (!$scope.containsNode(project.name))
                            nodesToAdd.push({ id: project.name, type: 'PROJECT' });
                        if (!$scope.containsLink(project.name, node.id))
                            linksToAdd.push({ from: project.name, to: node.id });
                    }
                }
            }
        } else if (node.type == 'PROJECT') {
            for (var projectIndex in $scope.projects) {
                var project = $scope.projects[projectIndex];
                if (project.name == node.id) {
                    for (var personIndex in project.people) {
                        var person = project.people[personIndex];
                        if (!$scope.containsNode(person.name))
                            nodesToAdd.push({ id: person.name, type: 'PERSON' });
                        if (!$scope.containsLink(person.name, node.id))
                            linksToAdd.push({ from: person.name, to: node.id });
                    }
                }
            }
        }

        $scope.netChart.addData({nodes:nodesToAdd, links:linksToAdd});

        for (var addedNodeIndex in nodesToAdd) {
            var addedNode = nodesToAdd[addedNodeIndex];
            $scope.netChart.showNode(addedNode.id);
        }
    }

    $scope.containsNode = function (name) {
        for (var nodeIndex in $scope.netChart.nodes()) {
            var node = $scope.netChart.nodes()[nodeIndex];
            if (node.id == name)
                return true;
        }
        return false;
    };

    $scope.containsLink = function (name1, name2) {
        for (var linkIndex in $scope.netChart.links()) {
            var link = $scope.netChart.links()[linkIndex].data;
            if ((link.from == name1 && link.to == name2) || (link.from == name2 && link.to == name1))
                return true;
        }
        return false;
    }

    $scope.containsNodeFocusMode = function (name) {
        for (var nodeIndex in $scope.netChartData.nodes) {
            var node = $scope.netChartData.nodes[nodeIndex];
            if (node.id == name)
                return true;
        }
        return false;
    };

    $scope.containsLinkFocusMode = function (name1, name2) {
        for (var linkIndex in $scope.netChartData.links) {
            var link = $scope.netChartData.links[linkIndex];
            if ((link.from == name1 && link.to == name2) || (link.from == name2 && link.to == name1))
                return true;
        }
        return false;
    }
});