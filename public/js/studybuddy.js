
$(document).ready(function() {

    console.log("page is ready");
    //show filtermodal on load
    $('#filterModal').show();
    $('#main').hide();
    //array to store potential users/buddies
    var userArr = [];
    var list = $('#list');
    var userObjGlobal;

    // Get the modals
    var modal1 = document.getElementById('buddyModal');
    var modal2 = document.getElementById('filterModal');

    // Get the button that opens the modal
    var connectBtn = document.getElementById("connect");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal1.style.display = "none";
        $('#modalBudPhoto').html(" ");
        $('#modalBudName').html(" ");
        $('#modalBudAOS').html(" ");
        $('#modalBudEmail').html(" ");
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal1) {
            modal1.style.display = "none";
            $('#modalBudPhoto').html(" ");
            $('#modalBudName').html(" ");
            $('#modalBudAOS').html(" ");
            $('#modalBudEmail').html(" ");
        }
    }

//on click for buddy filter, depending on Academic Subject
$(document).on('click', '#buddySubmitBtn', function(event){
    event.preventDefault();

    //academicSub declaration to grab Academic Subject
    var academicSub = $('#buddyFilter').val().trim().toUpperCase();
    //won't submit if no value entered
    if (!academicSub) {
      return;
    }
    console.log(academicSub);

    //filter users by study_subject and populate to buddifier
    getbuddies(academicSub);

    //clear filter input and hide modal
    $('#buddyFilter').val('');
    $('#filterModal').hide();
    $('#main').show();
});

//render buddies and append to page
// Function for creating a new list row for buddies
  function createBuddies(buddyData) {
      console.log(buddyData);
        if(buddyData.length > 0) {
            for (var i = 0; i < buddyData.length; i++) {
                
                var li = $("<li>")
                li.addClass('pane');
                var imgDiv = $("<div>")
                //.css('background-image','url("' + userArr[i].photo + '")')
                var profDiv = $("<div>");
                // var likeDiv = $("<div>").addClass("like");
                // var dislikeDiv = $("<div>").addClass("dislike");
                
                var btn = $("<button>")
                btn.attr('id', 'connect').attr('data-email', buddyData[i].email).html("Connect<a href='#'></a>");

                imgDiv.addClass("img").appendTo(li);
                profDiv.addClass("info").html(
                    "<img src='"+ buddyData[i].photo +"'>" + "<br>" + 
                    "<p>" + buddyData[i].firstName + " " + buddyData[i].lastName + "</p>" + "<br>" +
                    "<p>" + buddyData[i].AOS + "</p>" +
                    "<p>" + buddyData[i].city + ", " + buddyData[i].state + "</p>" +
                    "<p>" + buddyData[i].school + "</p>"
                ).appendTo(li);
                btn.appendTo(li)
                // likeDiv.appendTo(li);
                // dislikeDiv.appendTo(li);
                list.append(li);
            };
        }
  }

// Function for retrieving buddies and getting them ready to be rendered to the page
  function getbuddies(academicSub) {
    $.get("/api/" + academicSub, function(data) {
        if (data === false) {
            return "No buddy found!";
        }
        else {
            //users to be populated, stored in array
            for (var i = 0; i < data.length; i++) {
                userArr.push(data[i]);
                console.log(data[i]);
            }
            createBuddies(data);
        }
    })
  }

//get buddy by email
  function getbuddiesByEmail(email) {
      console.log("first:" + email);
    
    $.get("/api/buddies", function(data) {
        if (data === false) {
            return "No buddy found!";
        }
        else {
            console.log("data: " + data);
            for (var i = 0; i < data.length; i++) {
                if (email === data[i].email) {
                    userObjGlobal = data[i];
                    console.log(userObjGlobal);
                    appendToModal(userObjGlobal)
                    return userObjGlobal;
                }
            }
        }
    })
  }

//appending info to modal;
function appendToModal(userObj) {
    $('#modalBudPhoto').html("<img src='"+ userObj.photo +"'>"); 
    $('#modalBudName').html(userObj.firstName + " " + userObj.lastName);
    $('#modalBudAOS').html(userObj.AOS);
    $('#modalBudEmail').html(userObj.email);
}

    $(document).on('click', '#connect', function(event){
        event.preventDefault();
        // When the user clicks on the button, open the modal
        modal1.style.display = "block";
        userEmail = $(this).attr('data-email');
        getbuddiesByEmail(userEmail);
    });

    //see profile button to redirect to selected user's profile page
    $(document).on('click', '#seeProfile', function(event){
        event.preventDefault();
        var res = encodeURIComponent(userObjGlobal.email);
        window.location.href = "/profile?email=" + res;
    });

});
