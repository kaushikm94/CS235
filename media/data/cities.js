// taken from https://raw.githubusercontent.com/jpatokal/openflights/master/data/airports.dat

var cities= []


function parseData(data){
	console.log(data)
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
callback)	         
