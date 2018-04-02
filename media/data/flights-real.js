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
<<<<<<< HEAD
	console.log("Inside parsingflights. Total length:",flightsJson.acList.length)
	for(var i=0; i < flightsJson.acList.length/4; ++i){
=======
	for(var i=0; i < flightsJson.acList.length; ++i){
>>>>>>> e219dd2f90cd3ceef34ca9e76c57e52f9ff992ac
		if(typeof flightsJson.acList != 'undefined'){
			if(typeof flightsJson.acList[i].From != 'undefined' && typeof flightsJson.acList[i].To != 'undefined'){

				var src = flightsJson.acList[i].From.split(" ");
				var dest = flightsJson.acList[i].To.split(" ");
				src = airportToLatLong(src[0])
				dest = airportToLatLong(dest[0])
				if(!Number.isNaN(src[0]) && !Number.isNaN(src[1]) && !Number.isNaN(dest[0]) && !Number.isNaN(dest[1])){
				var latLong = [src[0],src[1],dest[0],dest[1]]
				//console.log("Latlong value:",latLong)
				flights.push(latLong);
<<<<<<< HEAD
				}
			}
		}
	}
	flights.push([12.32,12.56,-10.52,-5.5])
	console.log("Flights",flights)
=======
				
			}
		}
	}
>>>>>>> e219dd2f90cd3ceef34ca9e76c57e52f9ff992ac
	len = flights.length;
	console.log("Length is :",len);
	return flights
}

<<<<<<< HEAD
if(typeof flights =='undefined'){
	console.log("Inside undefined call")
	

}

*/
