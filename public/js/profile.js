$(document).ready(function() {

  console.log("page is ready");
  
  var emailParam;
  var profileLocation;

  var fullName = $("#fullName");
  var userEmail = $("#email");
  var photoURL = $("#photoURL");
  var state = $("#state");
  var city = $("#city");
  var zipCode= $('#zipCode');
  var age = $("#age");
  var phone = $("#phone");
  var gender = $("#gender");
  var school = $("#school");
  var aos = $("#aos");
  var study = $("#study");

  function getQueryVariable(variable)
    {
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
    }

    emailParam = decodeURIComponent(getQueryVariable("email"));
    console.log("emailParam: "+ emailParam);

  // Getting buddy data by email
  getcurrentUser(emailParam);

  //get buddy by email
  function getcurrentUser(email) {
    
    $.get("/api/buddies/" + email, function(data) {

        if (data) {

             console.log("profile data: " + data);
          $('#profile').html(data.firstName + "'s Profile Page")
            fullName.html(data.firstName + " " + data.lastName);
            userEmail.html(data.email);


            $('#profilePhoto').html("<img src='"+ data.photoURL +"' style='width:200px;'>");

            state.html(data.state);
            city.html(data.city);
            zipCode.html(data.zipcode);
            age.html(data.age);
            phone.html(data.phoneNumber);
            gender.html(data.gender.toUpperCase());
            school.html(data.school);
            aos.html(data.aos);
            study.html(data.study_subject);

            var address;
            var geoURL;
            var map;
            address = data.zipcode;
            console.log(address);
            geoURL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&key=AIzaSyCaH_RlCTO1tD0nUfUg89kXlxymHQGYYyM";
            console.log(geoURL);

             $.ajax({
              url: geoURL,
              method: "GET"
            }).done(function(response){

            console.log(response);
            console.log(response.results[0].geometry.location.lat);
            console.log(response.results[0].geometry.location.lng);

            var center_lat = response.results[0].geometry.location.lat;
            var center_long = response.results[0].geometry.location.lng;
            var center_coord = new google.maps.LatLng(center_lat, center_long);
            
            //creating map and centering it on the coordinates
            map = new google.maps.Map(document.getElementById('map'), {
              center: {lat: center_lat, lng: center_long},
              zoom: 12
            });

            //place marker on input location
            var marker = new google.maps.Marker({
              position: center_coord,
              map: map,
              animation: google.maps.Animation.DROP,
              icon: '../assets/images/ic_home_black_24dp_1x.png',
              });

        });

      var queryURL = "https://dry-plateau-27231.herokuapp.com/?limit=3&term=library&location=" + data.zipcode;

      console.log(queryURL);

      
      var addresses = [];
      var address_div = $("#closest").html();
      address_div = $("#closest").html("<div>");
      address_div.append("<h1>Closest Libraries:</h1>");

      //ajax request 
      $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response){
        response_obj = JSON.parse(response);
        console.log(response_obj);


        //for loop for limit of two closest restaurant locations
        for (var i=0; i < 3; i++) {
          

          //taking library latitude and longitude and assigning to variables
          library_lat = response_obj.businesses[i].coordinates.latitude;
          library_long = response_obj.businesses[i].coordinates.longitude;

          console.log("latitude " + library_lat);
          console.log("longitude " + library_long);
          console.log("Address " + response_obj.businesses[i].location.address1 + " " + response_obj.businesses[0].location.city);

          addresses[i] = response_obj.businesses[i].location.address1 + " " + response_obj.businesses[0].location.city;
          var coordinates = new google.maps.LatLng(library_lat, library_long);

          //create marker for restaurant[i]
          var marker = new google.maps.Marker({
          position: coordinates,
          label: {
            text: labels[labelIndex++ % labels.length],
            color: "white",
          },
          animation: google.maps.Animation.DROP,
          icon: "../assets/images/book.png",
          map: map
          }); 
          markers[i] = marker;


          console.log(marker);
          address_div.append("<h2>" + ab[i] + ": </h2>");
          address_div.append("<h4>" + addresses[i] + "</h4>");
        }      

      });

        }
        else {
            return "No buddy found!";
        }
    })
  }

    //labels for markers on the map
  var markers = [];
  var labels = 'ABC';
  var labelIndex = 0;
  var ab = ["A","B","C"];

  //function to delete markers
  function deleteMarker(markerIndex){
    markers[markerIndex].setMap(null);
    labelIndex = 0;
  };


      //delete markers on map if there are any
      if (markers[0] != null){
        deleteMarker(0);
        deleteMarker(1);
      }
    
    });
