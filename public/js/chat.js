

auth.onAuthStateChanged(function(user) { 
    if(user) {
        $('#btnLogout').removeClass("hide");
        var queryUrl;
        queryUrl = "api/buddies/" + user.email;  
        console.log(queryUrl);

    var yourName;

    $.get(queryUrl, function(data) {
            console.log(data);
            yourName = data.firstName;
            console.log(yourName);
            currentid = data.id;
            return currentid;

            return yourName;
            
        });

      $(function () {
        
        var socket = io();
        $('form').submit(function(){
          socket.emit('chat message', $('#m').val());
          $('#m').val('');
          return false;
        });
        socket.on('chat message', function(msg){
          $('#messages').append($('<li>').text(yourName + ": " +msg));
          window.scrollTo(0, document.body.scrollHeight);
        });
      });

       
    } else {
        console.log('Not logged in');
        $('#btnLogout').addClass("hide");
    }
 
    });
    



// add to chat .html $('#messages').append($('<li>').text({{name}} + msg));