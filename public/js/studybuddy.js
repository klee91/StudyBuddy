$(document).ready(function() {

    console.log("page is ready");

    //show filtermodal on load
    $('#filterModal').show();
    
    //array to store potential users/buddies
    var userArr = [];
    var list = $('#list');
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
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal1) {
            modal1.style.display = "none";
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
    getbuddies();
    $('#buddyFilter').val('');
    $('#filterModal').hide();
});

//render buddies and append to jTinder list
// Function for creating a new list row for authors
  function createBuddies(buddyData) {
      console.log(buddyData);
        if(buddyData.length > 0) {
            for (var i = 0; i < buddyData.length; i++) {
                
                var li = $("<li>")
                li.attr('id', i);
                var imgDiv = $("<div>")
                //.css('background-image','url("' + userArr[i].photo + '")')
                var profDiv = $("<div>")
                profDiv.addClass("info").html(
                    "<p>" + buddyData[i].firstName + " " + buddyData[i].lastName + "</p>" + "<br>" +
                    "<p>" + buddyData[i].AOS + "</p>" +
                    "<p>" + buddyData[i].city + ", " + buddyData[i].state + "</p>" +
                    "<p>" + buddyData[i].school + "</p>"
                ).appendTo(imgDiv);
                imgDiv.addClass("img").appendTo(li);
                list.append(li);
                $("#tinderslide").jTinder();
            };
        }
  }

// Function for retrieving buddies and getting them ready to be rendered to the page
  function getbuddies() {
    $.get("/api/buddies", function(data) {
      //users to be populated, stored in array
      for (var i = 0; i < data.length; i++) {
        userArr.push(data[i]);
        console.log(data[i]);
      }
      createBuddies(data);
    });
  }

//------TODO: add dynamically the user pool's info from mySQL database (w/ Sequelize ORM)----
//------info to show on slideshow includes user name, city/zip code, area of study/details------

    $(document).on('click', '#connect', function(event){
        event.preventDefault();
        $('#tinderSlide').css('z-index', '1');
        // When the user clicks on the button, open the modal
        modal.style.display = "block";
    });

    $(document).on('click', '#reject', function(event){
        event.preventDefault();
    });

    $(document).on('click', '#message', function(event){
        event.preventDefault();
    });

});
