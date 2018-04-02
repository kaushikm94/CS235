/*
var flights =[];
var flightsJson;
var len;


function errorLog(error){
	console.log(error)
}

function airportToLatLong(airportCode){
	var data1
	var res = []

	for(i =0; i< airports.length; ++i){
		if(airports[i][0] == airportCode){
			res = [airports[i][1], airports[i][2]]				
		}
	}
	return res
}

function parseflightsJson(flightsJson){
	console.log("Inside parsingflights. Total length:",flightsJson.acList.length)
	for(var i=0; i < flightsJson.acList.length/4; ++i){
		if(typeof flightsJson.acList != 'undefined'){
			if(typeof flightsJson.acList[i].From != 'undefined' && typeof flightsJson.acList[i].To != 'undefined'){

				var src = flightsJson.acList[i].From.split(" ");
				var dest = flightsJson.acList[i].To.split(" ");
				src = airportToLatLong(src[0])
				dest = airportToLatLong(dest[0])
				if(!Number.isNaN(src[0]) && !Number.isNaN(src[1]) && !Number.isNaN(dest[0]) && !Number.isNaN(dest[1])){
				var latLong = [src[0],src[1],dest[0],dest[1]]
				flights.push(latLong);
				}
			}
		}
	}
	flights.push([12.32,12.56,-10.52,-5.5])
	console.log("Flights",flights)
	len = flights.length;
	console.log("Length is :",len);
	return flights
}

if(typeof flights =='undefined'){
	console.log("Inside undefined call")
	

}

*/