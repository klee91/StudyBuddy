 $(document).ready(function() {
  console.log("page is ready");

  var firstInput = $("#firstname");
  var lastInput = $("#lastname");
  var emailInput = $("#loginEmail");
  var passInput = $("#loginPassword");
  var photoURL = $('#photoURL');
  var stateSelect = $("#state");
  var cityInput = $("#city");
  var zipCode = $('#zipCode');
  var ageInput = $("#age");
  var phoneInput = $("#phone");
  var signupForm = $("#signup");
  var genderSelect = $("#gender");
  var schoolInput = $("#school");
  var aoeInput = $("#aos");
  var studySelect = $("#study");

  var currentid;
  var isZip = false;
//add a realtime listener
auth.onAuthStateChanged(function(user) { 
    if(user) {
        $('#btnLogout').removeClass("hide");

        var queryUrl = "api/buddies/" + user.email;  

        $.get(queryUrl, function(data) {
            console.log(data);

            //handlebars code to put data onto settings.handlebars//
          console.log(data.id || data.id);
        // If this post exists, prefill our cms forms with its data
        firstInput.val(data.firstName);
        lastInput.val(data.lastName);
        emailInput.val(data.email);
        photoURL.val(data.photoURL);
        passInput.val(data.password);
        stateSelect.val(data.state);
        cityInput.val(data.city);
        zipCode.val(data.zipcode);
        ageInput.val(data.age);
        phoneInput.val(data.phoneNumber);
        genderSelect.val(data.gender);
        schoolInput.val(data.school);
        aoeInput.val(data.aos);
        studySelect.val(data.study_subject);

        currentid = data.id;
        return currentid;
            
        });

    } else {
        console.log('Not logged in');
        $('#btnLogout').addClass("hide");
    }
    console.log('user', user);
 
    });

  //Arrays of vaules for state and gender drop down lists
  var states = ["AK","AL","AR","AZ","CA","CO","CT","DE","FL","GA","HI","IA","ID","IL","IN","KS",
        "KY","LA","MA","MD","ME","MI","MN","MO","MS","MT","NC","ND","NE","NH","NJ","NM",
        "NV","NY","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VA","VT","WA","WI","WV","WY"];

  createDropDown(states, stateSelect);

  var genders = ["Male", "Female", "Other"];

  createDropDown(genders, genderSelect);

  var studySubs = ["MATH","SCIENCE","HISTORY","ENGLISH","FOREIGN LANGUAGE","CODING"];

  createDropDown(studySubs, studySelect);

  // Gets the part of the url that comes after the "?" (which we have if we're updating a post)
  var emailParam;
  var buddyId;

  //function to create dropdown lists
  function createDropDown(arrayName, list){

    var rowsToAdd = [];

    for (var i = 0; i < arrayName.length; i++) {
      rowsToAdd.push(createRow(arrayName[i]));
    };

    list.empty();
    console.log(rowsToAdd);
    console.log(list);
    list.append(rowsToAdd);
    list.val(rowsToAdd);
  };

  // Sets a flag for whether or not we're updating info to be false initially
  var updating = true;

  // If we have this section in our url, we pull out the post id from the url
  // In '?post_id=1', postId is 1
  if (url.indexOf("?email") !== -1) {
    emailParam = url;
    console.log("emailParam:" + emailParam);
  }

// A function for handling what happens when the form to create a new post is submitted
  function handleFormUpdate(event) {
    // Wont submit the post if we are missing a body, title, or author
    if (!firstInput.val().trim() || !emailInput.val().trim() || !passInput.val()) {
      return;
    }
    
    //if not a valid zip code, will not submit
    if ( validateZIP(zipCode.val().trim()) == false) {
      alert("Zip code is incorrect");
      return ;
    }

    // Constructing a newBuddyInfo object to hand to the database
    var newBuddy = {
      firstName: firstInput.val().trim(),
      lastName: lastInput.val().trim(),
      email: emailInput.val().trim(),
      password: passInput.val().trim(),
      photoURL: photoURL.val().trim(),
      state: stateSelect.val().trim(),
      city: cityInput.val().trim(),
      zipcode: zipCode.val().trim(),
      age: ageInput.val().trim(),
      phoneNumber: phoneInput.val().trim(),
      gender: genderSelect.val().trim(),
      school: schoolInput.val().trim(),
      AOS: aoeInput.val().trim(),
      study_subject: studySelect.val().trim()
    }

      newBuddy.id = currentid;
      console.log(newBuddy);

      updateBuddy(newBuddy);
    };

    // Gets the part of the url that comes after the "?" (which we have if we're updating a post)
    $(document).on("click","#btnUpdate", function(event){
      event.preventDefault();
      handleFormUpdate();
    });

  // Getting buddy data by email
  getcurrentUser(emailParam);

  //get buddy by email
  function getcurrentUser(email) {
      console.log("first:" + email);
    
    $.get("/api/buddies/" + email, function(data) {
        if (data === false) {
            return "No buddy found!";
        }
        else {
            console.log("data: " + data);
        }
    })
  }

  // Creates the buddy options in the dropdown
  function createRow(item) {
    var listOption = $("<option>");
    listOption.attr("value", item);
    listOption.text(item);
    return listOption;
  }
    // zip code validator
    function validateZIP(field) {
      var valid = "0123456789-";
      var hyphencount = 0;

      if (field.length!=5 && field.length!=10) {
      alert("Please enter your 5 digit or 5 digit+4 zip code.");
      return false;
      }
      for (var i=0; i < field.length; i++) {
      temp = "" + field.substring(i, i+1);
      if (temp == "-") hyphencount++;
      if (valid.indexOf(temp) == "-1") {
      alert("Invalid characters in your zip code.  Please try again.");
      return false;
      }
      if ((hyphencount > 1) || ((field.length==10) && ""+field.charAt(5)!="-")) {
      alert("The hyphen character should be used with a properly formatted 5 digit+four zip code, like '12345-6789'.   Please try again.");
      return false;
        }
      }
      return true;
    }

    function updateBuddy(buddy) {
      var queryUrl = "/api/buddies/" + currentid;
      $.ajax({
        method: "PUT",
        url: queryUrl,
        data: buddy
      })
      .done(function() {
        window.location.href = "/settings";
        console.log("profile updated");
      });
    }
    });