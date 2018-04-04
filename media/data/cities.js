// taken from https://raw.githubusercontent.com/jpatokal/openflights/master/data/airports.dat
// getting a list of cities
var allCities= []
var cities = []


function parseData(data){
	var lines = data.split("\n")

	for(i=0; i < lines.length; ++i){

		if(typeof lines[i] != 'undefined'){
			var values = lines[i].split(",")
			if(typeof values != 'undefined'){	
				if(typeof values[2] != 'undefined' 
					&& typeof values[5] != 'undefined'
					&& typeof values[6] != 'undefined'
					&& typeof values[7] != 'undefined'){
					var city = values[2].replace(/\"/g,"").trim()
					var code = values[5].replace(/\"/g,"").trim()
					var lat = parseFloat(values[6].replace(/\"/g,"").trim())
					var long = parseFloat(values[7].replace(/\"/g,"").trim())
					var tmp = [city,code, lat, long]
					allCities.push(tmp)
				}
			}
		}
	}

	var nCities = 20

	for(i=0; i < nCities; ++i){
		var index = Math.floor((Math.random() * 7000) + 1);
		cities.push(allCities[index])
	}

}

function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}


httpGetAsync(
"https://raw.githubusercontent.com/jpatokal/openflights/master/data/airports.dat", 
parseData)	         

// console.log("filtered cities:",cities)