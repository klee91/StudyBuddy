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
        }
        else {
            return "No buddy found!";
        }
    })
  }


 

    //labels for markers on the map
  var markers = [];
  var labels = 'AB';
  var labelIndex = 0;
  var ab = ["A","B"];

  //function to delete markers
  function deleteMarker(markerIndex){
    markers[markerIndex].setMap(null);
    labelIndex = 0;
  };

    //take input and make it usable in URL
   
    // address = address.replace(/\s/g, "+");



});

function createMap(){
    //ajax request to take geoURL and get the coordinates of the location you entered
  
      };
