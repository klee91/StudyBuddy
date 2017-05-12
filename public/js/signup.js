

$(document).ready(function() {
  // Getting jQuery references to the post body, title, form, and author select
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

  // Creates the author options in the dropdown
  function createRow(item) {
    var listOption = $("<option>");
    listOption.attr("value", item);
    listOption.text(item);
    return listOption;
  }

  $(signupForm).on("#btnSignup", handleFormSubmit);
  // Gets the part of the url that comes after the "?" (which we have if we're updating a post)
  $(document).on("click","#btnSignup", function(event){
    event.preventDefault();
    handleFormSubmit();
    console.log("click is working");
  });

  var url = window.location.search;
  var queryUrl;

  // Sets a flag for whether or not we're updating a post to be false initially
  var updating = false;

  // A function for handling what happens when the form to create a new post is submitted
  function handleFormSubmit(event) {
    
    // Wont submit the post if we are missing a body, title, or author
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

    // If we're updating a post run updatePost to update a post
    // Otherwise run submitPost to create a whole new post
    if (updating) {
      newPost.id = postId;
      updatePost(newBuddy);
    }
    else {
      submitBuddy(newBuddy);
    }
  }

  // Submits a new post and brings user to blog page upon completion
  function submitBuddy(buddy) {
    $.post("/api/buddies", buddy, function() {
      window.location.href = "/settings/";

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

  // Update a given post, bring user to the blog page when done
  function updatePost(post) {
    $.ajax({
      method: "PUT",
      url: "/api/posts",
      data: post
    })
    .done(function() {
      window.location.href = "/blog";
    });
  }
});
