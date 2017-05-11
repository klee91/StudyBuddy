

$(document).ready(function() {
  // Getting jQuery references to the post body, title, form, and author select
  var firstInput = $("#firstname");
  var lastInput = $("#lastname");
  var emailInput = $("#loginEmail");
  var passInput = $("#loginPassword");
  var stateSelect = $("#state");
  var cityInput = $("#city");
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
  // var postId;
  // var authorId;
      var queryUrl;
  // Sets a flag for whether or not we're updating a post to be false initially
  var updating = false;

  // If we have this section in our url, we pull out the post id from the url
  // // In '?post_id=1', postId is 1
  // if (url.indexOf("?post_id=") !== -1) {
  //   postId = url.split("=")[1];
  //   getPostData(postId, "post");
  // }
  // // Otherwise if we have an author_id in our url, preset the author select box to be our Author
  // else if (url.indexOf("?author_id=") !== -1) {
  //   authorId = url.split("=")[1];
  // }

  // Getting the authors, and their posts
  // getAuthors();

  // A function for handling what happens when the form to create a new post is submitted
  function handleFormSubmit(event) {
    
    // Wont submit the post if we are missing a body, title, or author
    if (!firstInput.val().trim() || !lastInput.val().trim() || !genderSelect.val()) {
      return;
    }
      console.log("registering to SQL Server");
    // Constructing a newPost object to hand to the database
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
      state: stateSelect.val(),
      city: cityInput
        .val()
        .trim(),
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

 


  // // A function to get Authors and then render our list of Authors
  // function getAuthors() {
  //   $.get("/api/authors", renderAuthorList);
  // }
  // // Function to either render a list of authors, or if there are none, direct the user to the page
  // // to create an author first
  // function renderAuthorList(data) {
  //   if (!data.length) {
  //     window.location.href = "/authors";
  //   }
  //   $(".hidden").removeClass("hidden");
  //   var rowsToAdd = [];
  //   for (var i = 0; i < data.length; i++) {
  //     rowsToAdd.push(createAuthorRow(data[i]));
  //   }
  //   authorSelect.empty();
  //   console.log(rowsToAdd);
  //   console.log(authorSelect);
  //   authorSelect.append(rowsToAdd);
  //   authorSelect.val(authorId);
  // }

  // // Creates the author options in the dropdown
  // function createAuthorRow(author) {
  //   var listOption = $("<option>");
  //   listOption.attr("value", author.id);
  //   listOption.text(author.name);
  //   return listOption;
  // }

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
