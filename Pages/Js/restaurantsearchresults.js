(function(){
var params = window.location.search.substr(1).split('&');   
var ltne = params[0].split('=')[1];
var lnne = params[1].split('=')[1];
var ltsw =params[2].split('=')[1];
var lnsw = params[3].split('=')[1];
var location = params[4].split('=')[1];
var ltav = (ltne);
var lnav = (lnne);
restaurantresults(ltav,lnav,location);
})();




function restaurantresults(ltne,lnne,location){
    console.log(ltne+","+lnne);
var url="https://maps.googleapis.com/maps/api/place/radarsearch/json?location="+ltne+","+lnne+"&radius=50000&type=food&key=AIzaSyDmK6Sd3gL9a94OqHujkBA1G8NK4TensVA";
$.getJSON(url,function(data){
    for(var x=0;x<data.results.length;x++){
 var placeid = data.results[x].place_id;
 var lat = data.results[x].geometry.location.lat;
 var long = data.results[x].geometry.location.lng;
 var id  = data.results[x].id;
 ajaxcall("http://localhost:8080/addresults?id="+id+"&lat="+lat+"&long="+long+"&placeid="+placeid+"&requestedLocation="+location)
  }
});

/**Now call the service for showing results */
displayresults(location);
}

function ajaxcall(url){
    $.ajax({
        url : url
    });
}

/**Function for results based on the search location  */

function displayresults(location){
$('div.resultsdivclass').append("");
$.getJSON("http://localhost:8080/retrieveResults?locationname="+location,function(data){
    for(var x=0;x<data.length;x++){
        /** This is to get the data of a place  */
        var place = data[x].placeId;
        ResultsFinder(place);
    }
});
}


function ResultsFinder(place){
    url = "https://maps.googleapis.com/maps/api/place/details/json?placeid="+place+"&key=AIzaSyDmK6Sd3gL9a94OqHujkBA1G8NK4TensVA";
    console.log(url);
       $.getJSON("https://maps.googleapis.com/maps/api/place/details/json?placeid="+place+"&key=AIzaSyDmK6Sd3gL9a94OqHujkBA1G8NK4TensVA",
        function(data){
            /**formattted_address, formatted_phone_number, name , revirews */
           var international_number = data.result.international_phone_number;
           var name = data.result.name;
           var type = data.result.types[0];
           $('div.resultsdivclass').append("<p>--"+name+"--"+type+"--"+name+"</p>");
        });
}