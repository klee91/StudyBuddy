$(document).ready(function() {
  console.log("page is ready");
  // Gets the part of the url that comes after the "?" (which we have if we're updating a post)
  var emailParam;
  var buddyId;

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
    // emailParam = decodeURIComponent(emailParam);
    console.log("emailParam: "+ emailParam);

  // Getting buddy data by email
  getcurrentUser(emailParam);

  //get buddy by email
  function getcurrentUser(email) {
    
    $.get("/api/buddies/" + email, function(data) {
        if (data === false) {
            return "No buddy found!";
        }
        else {
            console.log("profile data: " + data);
            fullName.html(data.firstName + " " + data.lastName);
            userEmail.html(data.email);
            $('#profilePhoto').html("<img src='"+ data[i].photoURL +"'>");
            state.html(data.state);
            city.html(data.city);
            zipCode.html(data.zipcode);
            age.html(data.age);
            phone.html(data.phoneNumber);
            gender.html(data.gender.toUpperCase());
            school.html(data.school);
            aos.html(data.aos);
            study.html(data.study_subject);
        }
    })
  }

});



