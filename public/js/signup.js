

$(document).ready(function() {
  // Getting jQuery references to the buddy info
  var firstInput = $("#firstname");
  var lastInput = $("#lastname");
  var emailInput = $("#loginEmail");
  var passInput = $("#loginPassword");
  var photoURL = $('#photoURL');
  var stateSelect = $("#state");
  var cityInput = $("#city");
  var zipCode = $("#zipCode")
  var ageInput = $("#age");
  var phoneInput = $("#phone");
  var signupForm = $("#signup");
  var genderSelect = $("#gender");
  var schoolInput = $("#school");
  var aoeInput = $("#aoe");
  var studySelect = $("#study");

//Arrays of vaules for state and gender drop down lists
  var states = ["AK","AL","AR","AZ","CA","CO","CT","DE","FL","GA","HI","IA","ID","IL","IN","KS",
        "KY","LA","MA","MD","ME","MI","MN","MO","MS","MT","NC","ND","NE","NH","NJ","NM",
        "NV","NY","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VA","VT","WA","WI","WV","WY"];
  
  createDropDown(states, stateSelect);

  var genders = ["Male", "Female", "Other"];

  createDropDown(genders, genderSelect);

  var studySubs = ["MATH","SCIENCE","HISTORY","ENGLISH","FOREIGN LANGUAGE","CODING"];

  createDropDown(studySubs, studySelect);

  // Creates the options in the dropdown
  function createRow(item) {
    var listOption = $("<option>");
    listOption.attr("value", item);
    listOption.text(item);
    return listOption;
  }

  $(signupForm).on("#btnSignup", handleFormSubmit);

  $(document).on("click","#btnSignup", function(event){
    event.preventDefault();
    handleFormSubmit();
    console.log("click is working");
  });

  var url = window.location.search;
  var queryUrl;


  // A function for handling what happens when the form to create a new buddy
  function handleFormSubmit(event) {
    
    // Wont submit the post if we are missing the first name, last name, or gender
    if (!firstInput.val().trim() || !lastInput.val().trim() || !genderSelect.val()) {
      return;
    }

    //if not a valid zip code, will not submit
    if ( validateZIP(zipCode.val().trim()) == false) {
      alert("Zip code is incorrect");
      return ;
    }

      console.log("registering to SQL Server");
    // Constructing a new Buddy object to hand to the database
    var newBuddy = {
      firstName: firstInput
        .val()
        .trim(),
      lastName: lastInput
        .val()
        .trim(),
      email: emailInput
        .val()
        .trim(),
      password: passInput.val(),
      photoURL: photoURL.val().trim(),
      state: stateSelect.val(),
      city: cityInput
        .val()
        .trim(),
      zipcode: zipCode.val().trim(),
      age: ageInput
        .val()
        .trim(),
      phoneNumber: phoneInput
        .val()
        .trim(),
      gender: genderSelect.val(),
      school: schoolInput
        .val()
        .trim(),
      aos: aoeInput
        .val()
        .trim(),
      study_subject: studySelect.val()
    };

      //Submitting buddy info into the database
      submitBuddy(newBuddy);

  };

  // Submits a new buddy and brings user to profile page upon completion
  function submitBuddy(buddy) {
    $.post("/api/buddies", buddy, function() {
      window.location.href = "/profile?=" + buddy.email;

    });
  }


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

});
