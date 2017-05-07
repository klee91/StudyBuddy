
//------------------jTinder Function -----------------------

//users to be populated stored in array
var userArr = [];

$(document).ready(function() {
    console.log("page is ready")

    // jQuery('<div/>', {
    //     id: 'tinderslide',
    // }).appendTo('#main');
    
    // jQuery('<ul/>', {
    // }).appendTo('#tinderslide');

    // for (var i = userArr.length; i >= 0; i--) {
    //     //dynamically make divs for jTinder slideshow
        

    //     var li = $("li")
    //     li.addClass("pane" + (i));
    //     var imgDiv = $("div")
    //     //.css('background-image','url("' + userArr[i].photo + '")')
    //     var profDiv = $("div")
    //     var likeDiv = $("div")
    //     var dislikeDiv = $("div")

    //     dislikeDiv.addClass("dislike").appendTo(likeDiv);
    //     likeDiv.addClass("like").appendTo(profDiv);
    //     profDiv.addClass("info").appendTo(imgDiv);
    //     imgDiv.addClass("img").appendTo(li);
    //     li.appendTo('ul')
    // };
    
//------TODO: add dynamically the user pool's info from mySQL database (w/ Sequelize ORM)----
//------info to show on slideshow includes user name, city/zip code, area of study/details------
        // jQuery('<div/>', {
        //     class: 'img',
        //     src: userArr[i].pic,
        // }).appendTo('li');
    // Get the modal
    var modal = document.getElementById('buddyModal');

    // Get the button that opens the modal
    var connectBtn = document.getElementById("connect");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

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
