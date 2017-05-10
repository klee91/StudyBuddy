$(document).ready(function() {
  console.log("page is ready");
  // Gets the part of the url that comes after the "?" (which we have if we're updating a post)
  var url = window.location.search;
  var emailParam;
  var buddyId;

  // If we have this section in our url, we pull out the post id from the url
  // In '?post_id=1', postId is 1
  if (url.indexOf("?email") !== -1) {
    emailParam = decodeURIComponent(url);
    console.log("emailParam:" + emailParam);
  }

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

});



