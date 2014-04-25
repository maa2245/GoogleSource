/**
 * @author
 */


var myKey = "&key=AIzaSyDgXCjc_6-rhgi4hlZ8B38upvpVu8nXd-4";

var myTableURL = "https://www.googleapis.com/fusiontables/v1/query?sql=SELECT+*+FROM+1PoY0Neevzt4EX3lNK3--RI3GKvz6LcY8JG-kj18S+WHERE+DATE>";

//UEMPDATA is the local name of the json file I just loaded

function dataLoaded(UNEMPDATA) {

	console.log(UNEMPDATA);

	var gDataTable = new google.visualization.DataTable();

	// when I add columns, the first parameter is the data type in that column
	//the second parameter is the name of the column

	gDataTable.addColumn('string', UNEMPDATA.columns[0]);
	gDataTable.addColumn('number', UNEMPDATA.columns[1]);
	gDataTable.addColumn({type:'string', role:'tooltip','p':{'html':true}});


	gDataTable.addRows(UNEMPDATA.rows);

	var ChartOptions = {
		title : "Unemployment since 1980",
		tooltip: { isHtml: true }
		
	};

	// tell it to create a linechart
	var gChart = new google.visualization.LineChart(document.getElementById("myChartDiv"));

	// What do I pass to .draw?
	gChart.draw(gDataTable, ChartOptions);
}

function showNewData (e) {
	//e is my click event; I will use its target property to get the id of the div.
	
	var myID = e.target.id; // e.g "year 2000"
	console.log(myID);
	var myNameArray = myID.split("_"); //splits it into an array, "2000"
	var myYear = myNameArray[1]; // grab the year
	
	$.get(myTableURL+"'"+myYear+"-01-01'"+myKey, dataLoaded, "json");	
	
	History.pushState({year:myYear}, "Unemployment from - "+myYear, "?year="+myYear);
	
	
}


function googleLoaded() {
	
	var myURL = History.getState().cleanUrl;
	var queryArray = myURL.split("?"); //split the URL on the question mark
	
	var defaultYear = "1990";
	
	if(queryArray.length >1){
		// Get the query string, break it on equal and then take the right half, which contains the year.
		defaultYear = queryArray[1].split("=")[1];
		
	}

	$(".btn-success").on("click", showNewData); 

	
	//instead of loading data from a static json file
	// I am goig to load it from a Google Fusion Table

	// three parameters: file name,
	
	//grab the button with the id that is year_"defaultYear"
	$("#year_"+defaultYear).click();
	//$.get(myTableURL+"'1990-01-01'"+myKey, dataLoaded, "json");

}

function GoogleVizLoaded() {

	console.log("got to page loaded");

	//load the google viz library
	google.load("visualization", "1", {
		packages : ["corechart"],
		callback : "googleLoaded"
	});

}
	


$(document).ready(GoogleVizLoaded); 