
/*
Global scope variable for location`
*/

function search(value){
    /*
    This function is to get the data from the google API
    */
    var url = "https://maps.googleapis.com/maps/api/geocode/json?address="+value+"&key=AIzaSyDmK6Sd3gL9a94OqHujkBA1G8NK4TensVA";
    $.getJSON(url,function(data){
        locationfinder(data);
    });
}

/*
This function allows us to retrieve the data from google Map Api
*/

function locationfinder(data){
    $('div.searchresults').replaceWith("<div class=searchresults></div>");
    for(var i=0;i<data.results.length;i++){
        var value = data.results[i].formatted_address;
        $('div.searchresults').append("<a href='#' onclick='latitudelongitude(\""+value+"\")'>"+data.results[i].formatted_address+"</a><br>")
    }
}

function latitudelongitude(searchlocation){
     var url = "https://maps.googleapis.com/maps/api/geocode/json?address="+searchlocation+"&key=AIzaSyDmK6Sd3gL9a94OqHujkBA1G8NK4TensVA";
    $.getJSON(url,function(data){
        findrestaurants(data,searchlocation);
    });
}
/** This function is to listen the enter on the search bar*/
$(document).keypress(function(e){
    if(e.which==13){
        search(document.getElementById("searchbarid").value);
    }
});

/** this function is to find the restaurant from the latitude longitude*/

function findrestaurants(locationdata,searchlocation){
    
    for(var x=0;x<locationdata.results.length;x++){
        var latne =locationdata.results[x].geometry.bounds.northeast.lat;
        var longne = locationdata.results[x].geometry.bounds.northeast.lng;
        var latsw = locationdata.results[x].geometry.bounds.southwest.lat;
        var longsw = locationdata.results[x].geometry.bounds.southwest.lng;
        restaurantslist(latne,longne,latsw,longsw,searchlocation);
    }
}

/**This function finds all the restaurants in the given lat and longs */
function restaurantslist(ltne,lnne,ltsw,lnsw,searchlocation){
    var word = searchlocation.split(" ");
    var loc="";
    for(var x=0;x<word.length;x++){
        loc = loc+word[x].split(",")[0];
    }
    location.href="./Pages/searchResults.html?ltne="+ltne+"&lnne="+lnne+"&ltsw="+ltsw+"&lnsw="+lnsw+"&requestedLocation="+loc;
}
