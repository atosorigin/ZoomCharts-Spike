# ZoomCharts Spike
This project is the output of a 'dev spike' which investigated using [ZoomCharts](https://zoomcharts.com/en/). This is an interactive HTML5 charts family, details of pricing can be found [here](https://zoomcharts.com/en/pricing/). This project was created using a free 30 day trial (the license is added using a `<script>` tag, but has been removed from the source code of this project).

### Installation
After purchasing a license, then ZoomCharts is added to a project by adding `zoomcharts.js` and `zc.css` to the project. These can be found on the 'My Account' page on the ZoomCharts site which includes more details of the installation process. The `zoomcharts.js` file is 840KB in this example.

*NOTE: there are a number of extra files which may need to be added to use certain charts e.g. `moment.js`, `moment-tz.js`, `sprite.png` etc. Again these can all be easily found on the ZoomCharts site exemplars.*

### Description
This project is a single page which contains examples of how to use a number of different ZoomCharts components: PieChart, FacetChart, NetChart and TimeChart. A part of this investigation was to ensure that ZoomCharts were compatible with AngularJS, so this has also been added into the project.

The easiest way to add a chart is to add a `<div id="...">` tag to a `.html` file. This `div` is then accessed using `document.getElementById("...")` and a chart added using a chart constructor such as `new PieChart({...});` in a `.js` file.

A `JSON` object is passed into the constructor. This object contains nodes for `container`, `area` and `data`. The `container` node has a value of `document.getElementById("...")`. The `area` node in this example sets the height of the chart. The `data` node defines the data which backs the chart and must follow a specific structure for each chart.

It is also possible to create AngularJS directives for ZoomCharts, so they can be added to a page using, for example `<pie-chart>`. Though, these directives aren't provided by ZoomCharts and would need creating, that hasn't been done as part of this investigation.

All ZoomChart's are very responsive and mobile-friendly.

#### PieChart
A PieChart is created using a `new PieChart` constructor. In the `data` object there is a node called `preloaded` which contains `subvalues`. Each slice in the PieChart is represented by an object with `value` (the numerical value for the data) and `name` (the label to represent the data). The object can also have a `subvalues` node which represents the slices child objects. In the example, the `subvalues` for the object named 'Hamilton Ricard' have also got a `colour` set which is used to style the slices.

Also in the PieChart constructor is a `slice` node which is used to style the slices in the PieChart. In this example the slice colour and labels are set.

The PieChart is simple to use, clicking on a slice will focus in on that slice and show details of child values. Clicking the centre of the PieChart will zoom back out. 

In the example, a button has been added to add a goal for a selected player and season and then the PieChart is refreshed with the updated data.

![image](https://cloud.githubusercontent.com/assets/6545019/21321235/f0acbc5a-c60b-11e6-8bea-7c694c772ded.png)

#### FacetChart
The FacetChart is created using a `new FacetChart` constructor, this is an interactive bar chart. It contains the same nodes as a PieChart and is backed by the same data model.

In this constructor the `series` node is also added which in this example is used to format the labels for each bar in the chart.

The FacetChart works in a similar way to PieChart where clicking on a bar will focus in on that slice and show bars for the child values. There is a 'Back' and 'Zoom Out' button to return. 

Again, this example is backed by the button to add a goal for a selected player and season and refresh the FacetChart.

![image](https://cloud.githubusercontent.com/assets/6545019/21321268/0e8c5c94-c60c-11e6-9d43-456173447b3d.png)

#### NetChart
The NetChart is created using a `new NetChart` constructor which is a chart used to link objects together. Again, this has `container`, `area` and `data` nodes. In the `data` object there is a node called `preloaded` which contains `nodes` and `links`. The `nodes` are the list of nodes on the chart and each have an `id`. The `links` are used to define links between nodes, they have an `id` and then a `from` and `to` value which are set using the `id`'s of the nodes.

In this example the constructor also contains `interaction`, `navigation` and `style`. The `interaction` node is used to prevent the the chart from scrolling in and out when scrolling the mouse wheel or  through pinch gestures. The `navigation` node defines the initial node to display, if this is not set, then the full NetChart is displayed initially. The `style` node is used to style the chart, in this case the node colour and line colour to join nodes are set.

Once more, the NetChart is easy to use, clicking a node will expand it and a node can be closed using the menu displayed when right-clicking on a node. The chart can be zoomed in and out using the zoom control.

A button has been added to add extra links between players to the data object and then the chart is updated by calling the in-built `reloadChart()` method.

![image](https://cloud.githubusercontent.com/assets/6545019/21321294/1e2b6e4c-c60c-11e6-8903-25ca614e544e.png)

#### TimeChart
The TimeChart is created using a `new TimeChart` constructor which is a bar chart used to represent values over time (similar to the FacetChart, but with the x-axis predefined).  Again, this has `container`, `area` and `data` nodes. In the `data` object there is a node called `preloaded` which contains `values`, each of these have a date/time linked to a value.

In this example the constructor also contains `interaction` and `toolbar` nodes. The `interaction` node is used to disable zooming on the bars (this zooming can be used to view values by month, week, day. hour etc.). The `toolbar` node is used to override the default toolbar and just add functionality to export to *.png* and *.xlsx*.

![image](https://cloud.githubusercontent.com/assets/6545019/21321314/2bbf37f0-c60c-11e6-817d-62e43d1005eb.png)

### Support
There are many examples and a detailed documentation for all ZoomCharts which can be found [here](https://zoomcharts.com/developers/en/introduction.html). There is also a [forum](https://forum.zoomcharts.com/) used to raise issues and ask questions about using ZoomCharts.
