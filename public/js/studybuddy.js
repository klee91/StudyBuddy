
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

    for (var i = 0; i < userArr.length; i++) {
        //dynamically make divs for jTinder slideshow

        var li = $("li")
        li.addClass("pane" + (i+1));
        var imgDiv = $("div")
        imgDiv.addClass("img").appendTo(li);
        var profDiv = $("div")
        profDiv.addClass("info").appendTo(imgDiv);
        var likeDiv = $("div")
        likeDiv.addClass("like").appendTo(profDiv);
        var dislikeDiv = $("div")
        dislikeDiv.addClass("dislike").appendTo(likeDiv);
        li.appendTo('ul')

        // jQuery('<div/>', {
        //     class: 'img',
        //     src: userArr[i].pic,
        // }).appendTo('li');
    };
});

$(document).on('click', '#connect', function(){
});

$(document).on('click', '#reject', function(){
});

{/*<div id="tinderslide">
    <ul>
        <li class="pane1"><div class="img"></div><div>Miami Beach</div><div class="like"></div><div class="dislike"></div></li>
        <li class="pane2"><div class="img"></div><div>San Francisco</div><div class="like"></div><div class="dislike"></div></li>
        <li class="pane3"><div class="img"></div><div>Chicago</div><div class="like"></div><div class="dislike"></div></li>
        <li class="pane4"><div class="img"></div><div>New York</div><div class="like"></div><div class="dislike"></div></li>
        <li class="pane5"><div class="img"></div><div>Beach</div><div class="like"></div><div class="dislike"></div></li>
    </ul>
</div>*/}