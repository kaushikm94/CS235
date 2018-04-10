var
	source,
	dest,
	sCode,
	//dCode,
	sourceLat,
	sourceLong,
	//destLat,
	//destLong,
	temp = [],
	newFlights = []


function f(start,end){
	source = start;
	if(source){
		temp = source.split(",")
		sCode = temp[0]
		sourceLat = parseFloat(temp[1])
		sourceLong = parseFloat(temp[2])
		// temp = dest.split(",")
		// console.log("temp again", temp)
		// dCode = temp[0]
		// destLat = temp[1]
		// destLong = temp[2]
		console.log("Source Lat and long:", sourceLat,sourceLong)
		console.log("Flights data initially: ",flights)
		for ( i=0;i< flights.length;i++){
			if((Math.abs(sourceLat - flights[i][0])< 0.02)  && (Math.abs(sourceLong - flights[i][1])< 0.02)){
				//console.log("Inside if")
				var newlatLong = [parseFloat(flights[i][0]),parseFloat(flights[i][1]),parseFloat(flights[i][2]),parseFloat(flights[i][3])]
				newFlights.push(newlatLong)
			}
		}
	console.log("NewFlights contents:",newFlights)
	flights = []
	flights = newFlights;
	console.log("New flight data" , flights)
	callBase(2);
  	}
}