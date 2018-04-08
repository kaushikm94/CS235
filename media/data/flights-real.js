//Globals
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


//Parse flight data for latitude and longitude
function parseflightsJson(flightsJson){
	for(var i=0; i < flightsJson.acList.length; ++i){
		if(typeof flightsJson.acList != 'undefined'){
			if(typeof flightsJson.acList[i].From != 'undefined' && typeof flightsJson.acList[i].To != 'undefined'){
				var src = flightsJson.acList[i].From.split(" ");
				var dest = flightsJson.acList[i].To.split(" ");
				src = airportToLatLong(src[0])
				dest = airportToLatLong(dest[0])
				if(!Number.isNaN(src[0]) && !Number.isNaN(src[1]) && !Number.isNaN(dest[0]) && !Number.isNaN(dest[1])){
				var latLong = [parseFloat(src[0]),parseFloat(src[1]),parseFloat(dest[0]),parseFloat(dest[1])]
				// console.log("Latlong value:",latLong)
				flights.push(latLong);
				}
			}
		}
	}
}

// setInterval(function()
// {
// 	$.ajax({
// 		type:"GET",
// 		url:"http://public-api.adsbexchange.com/VirtualRadar/AircraftList.json",
// 		dataType:'jsonp',
// 		success: function(data){

// 			try{
// 				var obj = data
// 			}catch (error){
// 				errorLog(error)
// 			}
// 				flightsJson = obj
// 				// console.log(flightsJson)
// 				if(typeof flightsJson != 'undefined')
// 					parseflightsJson(flightsJson);

// 				callBase()
// 				// reload(base.js)

// 			}
// 		});
// }, 5000);


//Load live data

$(document).ready(function(){
	console.log("Document loaded")
	$.ajax({
		type:"GET",
		url:"http://public-api.adsbexchange.com/VirtualRadar/AircraftList.json",
		dataType:'jsonp',
		success: function(data){
			console.log("Ajax call success")
			try{
				flightsJson = data
			}catch (error){
				errorLog(error)
			}
				//flightsJson = obj
				console.log('Flight data',flightsJson)
				if(typeof flightsJson != 'undefined')
					parseflightsJson(flightsJson);

				// Flight data can be spliced according to need. Data compression can be a future modification
				//flights = flights.splice(0,500)

				console.log('Parsed flight data from ajax')
				callBase()

				//Base js recalled to load ajax call data
				console.log('Reloaded base.js with new flight data')
			}
		});

})

console.log("Flights array:", flights);
